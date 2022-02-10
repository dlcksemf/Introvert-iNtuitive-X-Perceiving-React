import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminBookDetail({ postId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [{ data: post, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/books/api/books/${postId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    // e.preventDeafault();
    window.confirm('도서를 삭제하시겠습니까?');
    // REST API 에서는 DELETE 요청에 대한 응답이 없다
    deletePost().then(() => {
      navigate('/manager/booklist/');
    });
  };

  // const notify = () => toast('Wow so easy!');

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {error &&
        `로딩 중 에러(${deleteError.response.status} ${deleteError.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {post && (
        <>
          <h3 className="text-2xl my-5">{post.title}</h3>
          {post.cover_photo && (
            <img
              src={post.cover_photo}
              alt={post.cover_photo}
              className="w-100 h-100"
            />
          )}
          <div>
            {post.story.split(/[\r\n]+/).map((line, index) => (
              <p className="my-2" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/manager/booklist/" className="hover:text-red-400">
          목록으로
        </Link>
        <Link to={`/bookform/${postId}/edit/`} className="hover:text-red-400">
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
export default AdminBookDetail;
