import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from 'base/hooks/Authcontext';
import { useApiAxios } from 'base/api/base';

import LoanedModal from 'components/parts/LoanedModal';
import LoadingIndicator from 'components/LoadingIndicator';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';
import non_image from 'components/parts/image/non_image.jpg';

import { ToastContainer } from 'react-toastify';
import ReviewPage from 'pages/ReviewPage';

function BookDetail({ book_num }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  let { pathname, state } = location;

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
  }, [refetch, reloading]);

  useEffect(() => {
    book && getWish();
  }, [auth, book, getWish]);

  const reload = () => {
    getWish();
    refetch();
  };

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요') &&
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
          <div className="border-b-4 border-sky-600 w-3/4 relative left-[200px]">
            <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
              도서 상세 정보
            </h2>
          </div>
          <div className="relative top-[40px] left-[325px] w-[200px] select-none shadow-2xl">
            {book?.cover_photo && (
              <img
                src={book?.cover_photo}
                alt={book?.title}
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
            {!book?.cover_photo && (
              <img
                src={non_image}
                alt="non_image"
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
          </div>
          <section
            className="text-left text-gray-600 select-none
          relative left-[580px] bottom-[220px] w-[890px]"
          >
            {book?.category && (
              <h2 className="mb-2">카테고리 : [ {book?.category} ]</h2>
            )}
            <h1 className="mb-2">제 목 : {book?.title}</h1>
            <h1 className="mb-2">작 가 : {book?.writer}</h1>
            {book?.translator && (
              <h1 className="mb-2">역 자 : {book?.translator}</h1>
            )}
            <h1 className="mb-2">출판사 : {book?.publisher}</h1>
            <h1 className="mb-2">출판일 : {book?.published_date}</h1>
            <h1 className="mb-2">ISBN : {book?.ISBN}</h1>
            <h1 className="mb-2">수 량 : {book?.amount} 권</h1>
            <button
              onClick={buyLink}
              className="text-indigo-900 text-s hover:font-bold
              relative left-[300px] bottom-[270px]"
            >
              @알라딘에서 책찾기
            </button>
            <div className="flex">
              <span className="text-gray-600 m-auto select-none">찜하기</span>
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
                    <div onClick={handleClickLoan} className="">
                      <LoanedIcon />
                    </div>
                  </>
                )}

                {book?.state !== 'A' && (
                  <p className="m-auto select-none hover:text-indigo-600">
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
          </section>
          <div className="leading-relaxed w-[850px] select-none relative left-[300px] bottom-[120px]">
            <h1 className="text-2xl font-bold relative bottom-[10px]">
              책소개
            </h1>
            {book?.story.split(/[\r\n]+/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
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
                  text-gray-600 hover:text-indigo-600 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded"
            >
              목록으로
            </div>
          </Link>
          <div className="flex justify-center select-none">
            <h1 className="text-2xl font-bold">한줄평</h1>
            <div>
              <ReviewPage book={book} reload={setReloading} />
            </div>
          </div>
          {/* 
               
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
                            <div onClick={handleClickLoan} className="">
                              <LoanedIcon />
                            </div>
                          </>
                        )}

                        {book?.state !== 'A' && (
                          <p className="m-auto select-none hover:text-indigo-600">
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
            </div>
          </section> */}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default BookDetail;
