import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BookDetail({ book_num }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: book, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${book_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteBook] =
    useApiAxios(
      {
        url: `/books/api/books/${book_num}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      // REST API 에서는 DELETE 요청에 대한 응답이 없습니다.
      deleteBook().then(() => {
        navigate('/books/booklist/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response?.status} ${deleteError.response?.statusText})`}
      {book && (
        <>
          <h3 className="text-center">{book.title}</h3>
          <p className="text-center">저자 {book.writer}</p>
          <p className="text-center">역자 {book.translator}</p>
          <p className="text-center">출판사 {book.publisher}</p>
          <p className="text-center">출판일 {book.published_date}</p>
          <p className="text-center">ISBN {book.ISBN}</p>
          <p className="text-center">상태 {book.state}</p>

          {book.photo && (
            <img src={book.cover_photo} alt={book.title} className="rounded" />
          )}
          <div className="text-center">
            줄거리
            {book.story.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/books/booklist/" className="hover:text-red-400">
          목록으로
        </Link>
        <Link to={`/books/${book_num}/edit/`} className="hover:text-red-400">
          수정하기
        </Link>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default BookDetail;
