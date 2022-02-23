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
    <div>
      {loading && <LoadingIndicator />}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
      {book && (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {book?.cover_photo && (
                  <img
                    src={book?.cover_photo}
                    alt={book?.title}
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  />
                )}
                {!book?.cover_photo && (
                  <img
                    src={non_image}
                    alt="non_image"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  />
                )}
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest select-none mt-5 mb-3">
                    [ {book?.category} ]
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-5 select-none">
                    {book?.title} - {book?.writer}
                  </h1>
                  <div className="flex mb-4 select-none">
                    {book?.translator && (
                      <>
                        <span className="flex items-center select-none">
                          역자 {book?.translator}
                        </span>
                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s" />
                      </>
                    )}
                    <span className="flex py-2 select-none">
                      {book?.publisher}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      {book?.published_date}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      ISBN {book?.ISBN}
                    </span>
                  </div>
                  <p className="leading-relaxed select-none mt-14">
                    {book?.story.split(/[\r\n]+/).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </p>
                  <div className="flex mt-10 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <button
                      onClick={buyLink}
                      className="text-gray-600 text-s mb-20 hover:text-blue-700 hover:font-bold
                      transition duration-500 ease-in-out hover:scale-105"
                    >
                      알라딘에서 구매하기
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-start">
                      <Link
                        to="/books/booklist/"
                        type="button"
                        className="flex m-auto ml-auto 
                  text-gray-600 hover:text-blue-700 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        목록으로
                      </Link>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 m-auto select-none">
                        찜하기
                      </span>
                      <div className="mt-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
                        <Toggle
                          book={book}
                          wish={wish?.results[0]}
                          user_id={auth.user_id}
                          getWish={getWish}
                        />
                      </div>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        {book?.state === 'A' && (
                          <>
                            <span className="text-gray-600 m-auto select-none">
                              대출하기
                            </span>
                            <button
                              onClick={() => setModalIsOpen(true)}
                              className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                            >
                              <LoanedIcon />
                            </button>
                          </>
                        )}

                        {book?.state !== 'A' && (
                          <p className="m-auto select-none">
                            반납 예정일 ::{' '}
                            {book?.loaned_books[0]?.return_due_date}
                          </p>
                        )}
                        <LoanedModal
                          ariaHideApp={false}
                          modalIsOpen={modalIsOpen}
                          setModalIsOpen={setModalIsOpen}
                          book_num={book?.book_num}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default BookDetail;
