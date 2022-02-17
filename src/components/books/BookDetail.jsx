import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import LoanedModal from 'components/parts/LoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import Toggle from 'components/parts/Toggle';
import { useAuth } from 'base/hooks/Authcontext';

function BookDetail({ book_num }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [auth] = useAuth();

  const [{ data: book, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${book_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ data: wish }, getWish] = useApiAxios(
    {
      url: `/books/api/wishes/?user=${auth?.user_id}&book=${book?.book_num}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    getWish();
  }, [auth, book]);

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
            <Toggle
              book={book}
              wish={wish?.results[0]}
              user_id={auth.user_id}
              getWish={getWish}
            />

            {book?.state === 'A' && (
              <button onClick={() => setModalIsOpen(true)}>
                <LoanedIcon />
              </button>
            )}

            {book?.state !== 'A' && (
              <p>반납 예정일 :: {book?.loaned_books[0]?.return_due_date}</p>
            )}
            <LoanedModal
              ariaHideApp={false}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              book_num={book?.book_num}
            />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
              {book?.cover_photo && (
                <img
                  src={book?.cover_photo}
                  alt={book?.title}
                  className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                />
              )}
              {!book?.cover_photo && (
                <img
                  src={non_image}
                  alt="non_image"
                  className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                />
              )}
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {book.title} - [{book.category_id}]
                </h5>
                <p className="text-gray-600 text-s">저자 {book.writer}</p>
                <p className="text-gray-600 text-s">역자 {book.translator}</p>
                <p className="text-gray-600 text-s">출판사 {book.publisher}</p>
                <p className="text-gray-600 text-s">
                  출판일 {book.published_date}
                </p>
                <p className="text-gray-600 text-s">ISBN {book.ISBN}</p>
                <button onClick={buyLink} className="text-gray-600 text-s">
                  알라딘에서 구매하기
                </button>

                <p className="text-gray-700 text-lg mb-4">
                  {book.story.split(/[\r\n]+/).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link
          to="/books/booklist/"
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
}

export default BookDetail;
