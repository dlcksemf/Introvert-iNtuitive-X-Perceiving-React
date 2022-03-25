import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from 'base/hooks/Authcontext';
import { useApiAxios } from 'base/api/base';

import LoanedModal from 'components/parts/LoanedModal';
import LoadingIndicator from 'components/LoadingIndicator';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';
import non_image from 'components/parts/image/non_image.jpg';
import { ReviewSummary } from 'components/books/BookSummary';

import { ToastContainer } from 'react-toastify';
import ReviewPage from 'pages/ReviewPage';

function BookDetail({ book_num }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [auth] = useAuth();
  const [reloading, setReloading] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  let { pathname, state } = location;

  console.log(location);

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
  }, [refetch]);

  useEffect(() => {
    book && getWish();
  }, [auth, book, getWish]);

  const reload = () => {
    getWish();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch, reloading]);

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요🎈') &&
        navigate('/accounts/login/');
  };

  const buyLink = () => {
    window.open(
      `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${book.ISBN}`,
      '_blank',
    );
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && navigate(`*`)}
      {book && (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {book?.cover_photo && (
                  <img
                    src={book?.cover_photo}
                    alt={book?.title}
                    className="lg:w-2/6 w-full lg:h-2/6 h-64 object-cover object-center ml-28 mr-10 mt-14
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:skew-y-6"
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
                  {book?.category && (
                    <h2 className="text-sm title-font text-gray-500 tracking-widest select-none mt-5 mb-3">
                      [ {book?.category} ]
                    </h2>
                  )}
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-5 select-none
                  hover:font-semibold"
                  >
                    {book?.title}
                  </h1>
                  <h1 className="text-gray-900 text-xl title-font font-medium mb-5 select-none hover:font-semibold">
                    {book?.writer}
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
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      수량 : {book?.amount}
                    </span>
                  </div>
                  <div className="leading-relaxed select-none mt-14 hover:text-gray-900">
                    {book?.story.split(/[\r\n]+/).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="flex mt-10 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <button
                      onClick={buyLink}
                      className="text-gray-600 text-s mb-20 hover:text-blue-500 hover:font-bold
                      transition duration-500 ease-in-out hover:scale-105"
                    >
                      알라딘에서 책찾기
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <Link
                      to={
                        state?.beforeLocation
                          ? `/books/booklist/${state.beforeLocation}`
                          : `/books/booklist/`
                      }
                      state={{ pathname: pathname }}
                    >
                      <div
                        className="flex m-auto ml-auto 
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        목록으로
                      </div>
                    </Link>
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
                          reload={reload}
                        />
                      </div>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        {book?.state === 'A' && (
                          <>
                            <span className="text-gray-600 m-auto select-none">
                              대출하기
                            </span>
                            <div
                              onClick={handleClickLoan}
                              className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                            >
                              <LoanedIcon />
                            </div>
                          </>
                        )}

                        {book?.state !== 'A' && (
                          <p className="m-auto select-none hover:text-blue-500">
                            반납 예정일 :: {''}
                            {book?.loaned_books[0]?.return_due_date}
                          </p>
                        )}
                        <LoanedModal
                          ariaHideApp={false}
                          modalIsOpen={modalIsOpen}
                          setModalIsOpen={setModalIsOpen}
                          book_num={book?.book_num}
                          reload={reload}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white shadow-xl rounded-lg w-[1040px] ml-[75px]">
                  <ul className="divide-y divide-gray-300 hover:bg-gray-50">
                    {book?.review_set
                      ?.sort(
                        (user1, user2) => user2.count_loans - user1.count_loans,
                      )
                      .map((review) => (
                        <ReviewSummary
                          review={review}
                          key={review.review_num}
                          setReload={setReloading}
                        />
                      ))}
                  </ul>
                </div>
              </div>
              <div className="ml-[260px] mt-6">
                <ReviewPage book={book_num} setReload={setReloading} />
              </div>
            </div>
          </section>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default BookDetail;
