import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';

import LoanedModal from 'components/parts/LoanedModal';
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
import { LoanedIcon } from 'designMaterials/LoanedIcon';

function truncateString(str) {
  if (str.length > 70) {
    return str.slice(0, 70) + '...';
  } else {
    return str;
  }
}

function truncateTitle(str) {
  if (str.length > 15) {
    return str.slice(0, 15) + '...';
  } else {
    return str;
  }
}

function truncateName(str) {
  if (str.length > 8) {
    return str.slice(0, 8) + '...';
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
    <>
      <div class="mt-10 mb-10 ml-4 max-w-sm w-[550px] lg:max-w-full lg:flex relative left-[163px] top-[30px] select-none">
        <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <Link
            to={`/books/${book.book_num}/`}
            state={{ beforeLocation: location.search }}
          >
            <img
              alt={book?.title}
              src={book?.cover_photo ? book?.cover_photo : non_image}
            />
          </Link>
        </div>
        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">
              {book?.category && `[ ${book.category} ]`}
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">
              <Link
                to={`/books/${book.book_num}/`}
                state={{ beforeLocation: location.search }}
              >
                <h2>{book.title}</h2>
              </Link>
            </div>
            <div class="text-sm text-gray-600">
              <h2>
                {book.writer} | {book.amount} 권
              </h2>
            </div>
            <div class="text-gray-700 text-base text-left mt-1.5">
              <h2>{truncateString(book.story)}</h2>
            </div>
          </div>
          <div class="flex items-center">
            {book?.state === 'A' ? (
              <Toggle
                book={book}
                wish={wish?.results[0]}
                user_id={auth.user_id}
                getWish={getWish}
                reload={reload}
              />
            ) : (
              <Toggle
                book={book}
                wish={wish?.results[0]}
                user_id={auth.user_id}
                getWish={getWish}
                reload={reload}
              />
            )}
            {book?.state === 'A' ? (
              <div onClick={handleClickLoan}>
                <LoanedIcon />
              </div>
            ) : (
              <p className="hover:text-sky-600 relative left-6">
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
          </div>
        </div>
      </div>
    </>
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
            <div className="text-sm title-font text-gray-700 tracking-widest text-left mb-6 select-none">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold mr-2">
                {book?.category && `#${book?.category}`}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold mr-2">
                #{book?.writer}
              </span>
              <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 font-semibold mr-2">
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
                    className="text-white bg-indigo-600 mt-4 py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
                  >
                    자세히보기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/books/${book.book_num}/`);
                    }}
                    className="flex justify-center text-white bg-indigo-600 mt-[84px] py-2 px-12 
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
                className="text-white bg-indigo-600 mt-4 py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full"
              >
                자세히보기
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                className="flex justify-center text-white bg-indigo-600 mt-[84px] py-2 px-12 
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
  const navigate = useNavigate();
  const [flip, setFlip] = useState(false);

  //onClick 시 사용
  // function flipCard() {
  //   setFlip((prev) => !prev);
  // }

  return (
    <div className="">
      <>
        <div
          className="maincontainer select-none"
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
              <img src={card4} alt="" className="h-[350px]" loading="lazy" />

              {book?.count_loans ? (
                <div className=" absolute top-[155px] left-[83px] text-center text-neutral-500">
                  <p className="w-40 relative right-[38px] text-4xl font-extrabold select-none">
                    {book?.username}
                  </p>
                </div>
              ) : (
                <div className=" absolute top-[155px] left-[83px] text-center text-neutral-500">
                  <button
                    onClick={() => {
                      navigate(`/books/booklist/`);
                    }}
                    className="w-40 relative right-[38px] text-2xl font-extrabold"
                  >
                    책빌리러가기
                  </button>
                </div>
              )}
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
              className="h-40 relative right-[460px] bottom-[80px] select-none"
            />
            <img
              src={heavyreader}
              alt="EUCLID SOFT 영광의 주인공"
              className="h-40 relative right-[550px] bottom-[400px] select-none"
            />
          </>
        ) : (
          <img
            src={heavyreader1}
            alt="영광의 주인공이 되어주세요"
            className="h-40 relative right-[550px] bottom-[140px] select-none"
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
      <div
        className="max-w-sm rounded w-[300px] h-[380px] overflow-hidden 
      shadow-xl relative left-[155px] ml-10"
      >
        <img
          className="lg:w-full max-w-xs lg:h-[220px] max-h-xs object-scale-down cursor-pointer select-none"
          src={book?.cover_photo ? book?.cover_photo : non_image}
          alt={book?.title}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <div className="text-sm title-font text-gray-500 tracking-widest text-center mb-4 relative top-[15px]">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 select-none">
            {book?.category && `#${book?.category}`}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 select-none">
            #{truncateName(book?.writer)}
          </span>
        </div>
        <div className="px-6 select-none">
          <div
            className="font-bold text-xl mb-2 text-center relative top-[20px]"
            onClick={() => {
              navigate(`/books/${book.book_num}`);
            }}
          >
            {truncateTitle(book.title)}
          </div>
          <button
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
            className="text-white bg-indigo-600 border-0 mt-4 py-2 px-12 focus:outline-none
                 hover:bg-indigo-700 rounded-full relative top-[15px] left-[48px]"
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
          {auth?.user_id === review?.user_id ? (
            <div className="flex justify-end relative top-4 right-4">
              <button disabled={deleteLoading} onClick={handleDelete}>
                <p className="text-gray-500 text-sm hover:text-sky-600">삭제</p>
              </button>
            </div>
          ) : (
            <div className="flex justify-end relative top-4 right-4">
              <p className="text-white text-sm select-none">공간</p>
            </div>
          )}
          <span className="flex m-auto">
            <h2 className="mr-4 ml-4 select-none">
              <RateIcon review_rate={review.review_rate} />
            </h2>
            <h1 className="font-extrabold select-none">{review?.username}</h1>
            <h2 className="ml-4 mb-4 select-none">{review?.review_content}</h2>
            <h2 className="ml-4 select-none text-gray-500 text-sm mt-0.5">
              {review.updated_at.replace('T', ' ').substring(0, 16)}
            </h2>
          </span>
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
