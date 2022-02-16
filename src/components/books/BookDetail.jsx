import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import LoanedModal from 'components/parts/LoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';

function BookDetail({ book_num }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [{ data: book, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${book_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  console.log(book);

  const buyLink = () => {
    window.open('https://www.aladin.co.kr/home/welcome.aspx', '_blank');
  };

  return (
    <div className="text-center">
      {loading && <LoadingIndicator />}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
      {book && (
        <>
          <div className="flex justify-end">
            {book?.state === 'A' && (
              <button onClick={() => setModalIsOpen(true)}>
                <LoanedIcon />
              </button>
            )}
            {book?.state !== 'A' && <p>반납 예정일 :: {book.title}</p>}
            <LoanedModal
              ariaHideApp={false}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              book_num={book?.book_num}
            />
          </div>
          <h3>{book.title}</h3>
          <p>{book.category_id}</p>
          {book?.cover_photo && (
            <img
              src={book?.cover_photo}
              alt={book?.title}
              className="rounded-full m-auto"
            />
          )}
          {!book?.cover_photo && (
            <img
              src={non_image}
              alt="non_image"
              className="rounded-full m-auto"
            />
          )}
          <p>저자 {book.writer}</p>
          <p>역자 {book.translator}</p>
          <p>출판사 {book.publisher}</p>
          <p>출판일 {book.published_date}</p>
          <p>ISBN {book.ISBN}</p>
          <button onClick={buyLink}>알라딘에서 구매하기</button>
          <div className="text-center">
            {book.story.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                줄거리 :: {line}
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
      </div>
    </div>
  );
}

export default BookDetail;
