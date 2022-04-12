import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';

import LoanedModal from 'components/parts/LoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';

import non_image from 'components/parts/image/non_image.jpg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import 'css/HeavyReader.css';
import LoadingIndicator from 'components/LoadingIndicator';
import { RateIcon } from 'designMaterials/RateIcon';
import card5 from 'components/parts/image/card5.png';
import card4 from 'components/parts/image/card4.png';
import heavyreader1 from 'components/parts/image/heavyreader1.png';
import heavyreader from 'components/parts/image/heavyreader.png';
import ggumdori from 'components/parts/image/ggumdori.png';
import 'animate.css';

function truncateString(str) {
  if (str.length > 70) {
    return str.slice(0, 70) + '...';
  } else {
    return str;
  }
}
function BookSummary({ book, reloadBook }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let location = useLocation();

  const [{ data: wish }, getWish] = useApiAxios(
    {
      url: `/books/api/wishes/?user=${auth?.user_id}&book=${book?.book_num}`,
      method: 'GET',
    },
    { manual: true },
  );

  const reload = () => {
    getWish();
  };

  useEffect(() => {
    getWish();
  }, [auth, book, getWish]);

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요') &&
        navigate('/accounts/login/');
  };

  return (
    <div className="px-[90px] py-[15px] lg:w-1/2">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          alt={book?.title}
          className="flex-shrink-0 w-48 h-48 object-scale-down object-center sm:mb-0 mb-4 cursor-pointer
          inline-block mt-28"
          src={book?.cover_photo ? book?.cover_photo : non_image}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <span className="absolute inline-flex mt-96 ml-4">
          {book?.state === 'A' ? (
            <div className="ml-3">
              <Toggle
                book={book}
                wish={wish?.results[0]}
                user_id={auth.user_id}
                getWish={getWish}
                reload={reload}
              />
            </div>
          ) : (
            <div>
              <Toggle
                book={book}
                wish={wish?.results[0]}
                user_id={auth.user_id}
                getWish={getWish}
                reload={reload}
              />
            </div>
          )}
          {book?.state === 'A' ? (
            <div onClick={handleClickLoan} className="ml-2">
              <LoanedIcon />
            </div>
          ) : (
            <p className="m-auto ml-1 select-none hover:text-indigo-400">
              {book?.loaned_books[0]?.return_due_date}
            </p>
          )}
          <LoanedModal
            ariaHideApp={false}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            book_num={book?.book_num}
            reload={reloadBook}
          />
        </span>

        <Link
          to={`/books/${book.book_num}/`}
          state={{ beforeLocation: location.search }}
        >
          <div className="flex-grow sm:pl-8 mt-36">
            <h3 className="text-sm text-gray-500 mb-3 select-none flex cursor-default">
              {book?.category && `[ ${book.category} ]`}
            </h3>
            <h2
              className="absolute title-font font-medium text-lg text-black 
              cursor-pointer grid font-semibold"
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            >
              {book.title}
            </h2>
            <h3 className="mt-12 text-sm text-gray-500 select-none cursor-default">
              {book.writer} | {book.amount} 권
            </h3>
            <p
              className="font-medium text-base mb-4 mt-6 select-none cursor-pointer"
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            >
              {truncateString(book.story)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function NewBookSummary({ book }) {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <div>
          <img
            className="lg:w-full max-w-xs lg:h-72 max-h-xs object-scale-down cursor-pointer"
            src={book?.cover_photo ? book?.cover_photo : non_image}
            alt={book?.title}
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
          />
          <div className="relative left-[340px] bottom-[270px]">
            <div className="text-sm title-font text-gray-500 tracking-widest text-left mb-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
                {book?.category && `#${book?.category}`}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
                #{book?.writer}
              </span>
              <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
                #따끈따끈
              </span>
            </div>
            <div>
              <div
                className="text-gray-900 text-3xl title-font font-medium text-left mb-4 border-b-2 border-indigo-600 py-3 w-[700px]"
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
              >
                {book.title}
              </div>
              <p className="leading-relaxed mb-4 hover:font-semibold cursor-grab w-[600px]">
                {truncateString(book?.story)}
              </p>

              <div className="flex justify-start">
                {book?.story ? (
                  <button
                    onClick={() => {
                      navigate(`/books/${book.book_num}/`);
                    }}
                    className="flex justify-start text-white bg-indigo-600 border-0 mt-4 py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
                  >
                    자세히보기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/books/${book.book_num}/`);
                    }}
                    className="flex justify-center text-white bg-indigo-600 border-0 mt-[84px] py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
                  >
                    자세히보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Top5Summary({ book }) {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <div>
          <img
            src={book?.cover_photo ? book?.cover_photo : non_image}
            alt={book?.title}
            className="lg:w-full max-w-xs lg:h-72 max-h-xs object-scale-down object-left
                inline-block cursor-pointer"
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
          />
        </div>
        <div className="relative left-[270px] bottom-[280px]">
          <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2 text-left">
            {book?.category && `[ ${book?.category} ]`}
          </h2>
          <div className="text-lg m-auto">{book?.writer}</div>
          <h1 className="text-gray-900 text-3xl title-font font-medium text-left mb-4 border-b-2 border-indigo-600 py-3 w-[700px]">
            {book?.title}
          </h1>
          <p className="leading-relaxed mb-4 hover:font-semibold cursor-grab w-[600px]">
            {truncateString(book?.story)}
          </p>

          <div className="flex justify-start">
            {book?.story ? (
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                className="flex justify-start text-white bg-indigo-600 border-0 mt-4 py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
              >
                자세히보기
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                className="flex justify-center text-white bg-indigo-600 border-0 mt-[84px] py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
              >
                자세히보기
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function HeavyReaderSummary({ book }) {
  const [flip, setFlip] = useState(false);

  //onClick 시 사용
  // function flipCard() {
  //   setFlip((prev) => !prev);
  // }

  return (
    <div className="">
      <>
        <div
          className="maincontainer"
          onMouseEnter={() => setFlip(true)}
          onMouseLeave={() => setFlip(false)}
        >
          <div
            // onClick={() => flipCard()}

            className={`card ${flip ? 'flipCard' : ''}`}
            id="card"
          >
            <div className="front">
              <img
                src={card5}
                alt=""
                className="h-[350px] animate__animated animate__pulse animate__infinite"
              />
            </div>
            <div className="back">
              <img src={card4} alt="" className="h-[350px]" />

              <div className=" absolute top-[155px] left-[83px] text-center font-bold text-lg font-serif text-neutral-500">
                <p className="w-40 relative right-[38px] text-4xl font-extrabold">
                  {book?.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      <div>
        {book?.count_loans ? (
          <>
            <img
              src={ggumdori}
              alt="꿈돌이"
              className="h-40 relative right-[460px] bottom-[80px]"
            />
            <img
              src={heavyreader}
              alt="EUCLID SOFT 영광의 주인공"
              className="h-40 relative right-[550px] bottom-[400px]"
            />
          </>
        ) : (
          <img
            src={heavyreader1}
            alt="영광의 주인공이 되어주세요"
            className="h-40 animate__animated animate__pulse animate__infinite relative right-[550px] bottom-[140px]"
          />
        )}
      </div>
    </div>
  );
}

function RecommendedBooksSummary({ book }) {
  const navigate = useNavigate();
  return (
    <>
      <div lassName="max-w-sm rounded overflow-hidden shadow-xl">
        <img
          className="lg:w-full max-w-xs lg:h-72 max-h-xs object-scale-down cursor-pointer"
          src={book?.cover_photo ? book?.cover_photo : non_image}
          alt={book?.title}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <div className="text-sm title-font text-gray-500 tracking-widest text-left mb-4 relative bottom-[40px]">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 select-none">
            {book?.category && `#${book?.category}`}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 select-none">
            #{book?.writer}
          </span>
          <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 select-none">
            #추천해요
          </span>
        </div>
        <div className="px-6 select-none">
          <div
            className="font-bold text-xl mb-2 text-center relative bottom-[30px]"
            onClick={() => {
              navigate(`/books/${book.book_num}`);
            }}
          >
            {book.title}
          </div>
          <button
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
            className="text-white bg-indigo-600 border-0 mt-4 py-2 px-12 focus:outline-none
                 hover:bg-indigo-700 rounded-full relative bottom-[35px] left-[32px]"
          >
            자세히보기
          </button>
        </div>
      </div>
    </>
  );
}

function ReviewSummary({ review, setReload }) {
  const [auth] = useAuth();
  const [, setReviewDelete] = useState(false);

  const [
    { loading: deleteLoading, error: deleteError },
    deleteReview,
    refetch,
  ] = useApiAxios(
    {
      url: `/books/api/review/${review?.review_num}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('한줄평을 삭제하시겠습니까?')) {
      handleOkButton();
      deleteReview().then(() => {
        setReload((prev) => !prev);
      });
    } else {
      handleCancleButton();
    }
    setReviewDelete(true);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOkButton = () => {
    setReviewDelete(true);
  };

  const handleCancleButton = () => {
    setReviewDelete(false);
  };

  return (
    <div>
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {review && (
        <>
          <span className="flex justify-end">
            {auth?.user_id === review?.user_id && (
              <div className="relative top-4 right-4">
                {/* <button
                  // onClick={}
                  className="inline-flex border-2 border-indogo-600 text-black hover:text-indigo-700 rounded-full h-6 px-3 justify-center items-center"
                >
                  수정 // 구현하고 싶지만 보류
                </button> */}
                <button
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="inline-flex ml-1 justify-center items-center"
                >
                  <p className="m-auto text-gray-400 text-xs ">삭제</p>
                </button>
              </div>
            )}
          </span>
          <span className="flex mt-3">
            <h2 className="mr-4 ml-4 select-none">
              <RateIcon review_rate={review.review_rate} />
            </h2>
            <h1 className="font-extrabold select-none">{review?.username}</h1>
            <h2 className="ml-4 mb-4 select-none">{review?.review_content}</h2>
            <h2 className="ml-4 select-none text-gray-500 text-sm mt-0.5">
              {review.updated_at.replace('T', ' ').substring(0, 16)}
            </h2>
          </span>
          {/* <div className="relative right-10 bottom-6">
            {review.review_num ? (
              <ReviewForm
                input={review.review_content}
                review_num={review.review_num}
                review_rate={review.review_rate}
                review_content={review.review_content}
                value={review.review_num}
                // onChange={}
              />
            ) : null} // 수정 - 구현하고 싶지만 보류
          </div> */}
        </>
      )}
    </div>
  );
}

export {
  BookSummary,
  NewBookSummary,
  Top5Summary,
  HeavyReaderSummary,
  RecommendedBooksSummary,
  ReviewSummary,
};
