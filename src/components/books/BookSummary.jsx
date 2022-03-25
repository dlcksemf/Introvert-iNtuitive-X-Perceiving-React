import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';

import LoanedModal from 'components/parts/LoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';

import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavyReader.gif';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import 'css/HeavyReader.css';
import LoadingIndicator from 'components/LoadingIndicator';
import { RateIcon } from 'designMaterials/RateIcon';
import { utc } from 'moment';
import card from 'components/parts/image/card.png';
import card2 from 'components/parts/image/card2.png';
import ReviewForm from './ReviewForm';

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
      : window.confirm('로그인 후 이용해주세요🎈') &&
        navigate('/accounts/login/');
  };

  return (
    <div className="p-6 lg:w-1/2">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          alt={book?.title}
          className="flex-shrink-0 w-48 h-48 object-scale-down object-center sm:mb-0 mb-4 cursor-pointer
          transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 inline-block mt-28"
          src={book?.cover_photo ? book?.cover_photo : non_image}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <span className="absolute inline-flex mt-96 ml-8">
          <div className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100">
            <Toggle
              book={book}
              wish={wish?.results[0]}
              user_id={auth.user_id}
              getWish={getWish}
              reload={reload}
            />
          </div>
          {book?.state === 'A' ? (
            <div
              onClick={handleClickLoan}
              className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <LoanedIcon />
            </div>
          ) : (
            <p className="m-auto ml-5 select-none hover:text-blue-500">
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
              className="absolute title-font font-medium text-lg text-black hover:text-blue-500 cursor-pointer grid
           transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 hover:font-semibold"
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            >
              {book.title}
            </h2>
            <h3 className="mt-12 text-sm text-gray-500 select-none cursor-default">
              {book.writer}
            </h3>
            <p
              className="font-medium text-base mb-4 mt-6 select-none hover:font-semibold cursor-pointer"
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
      <div className="max-w-sm rounded overflow-hidden shadow-xl">
        <img
          className="w-[500px] h-[300px] object-scale-down cursor-pointer
          transition duration-500 ease-in-out hver:-translate-y-1 hover:scale-95"
          src={book?.cover_photo ? book.cover_photo : non_image}
          alt={book.title}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <div className="px-6 py-4">
          <div
            className="font-bold text-xl mb-2 select-none cursor-pointer hover:text-blue-600"
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
          >
            {book.title}
          </div>
          <p className="text-gray-700 text-base select-none">
            {truncateString(book.story)}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
            {book.category && `#${book.category}`}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
            #{book.writer}
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
            #따끈따끈
          </span>
        </div>
      </div>
    </>
  );
}

function Top5Summary({ book }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden mt-20">
        <div className="container mx-auto">
          <div className="lg:w-full mx-auto flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 mt-10 m-auto">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2 text-left">
                {book.category && `[ ${book.category} ]`}
              </h2>
              <div className="text-lg m-auto">{book.writer}</div>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 border-b-2 border-blue-400 py-3">
                {book.title}
              </h1>
              <p className="leading-relaxed mb-4 hover:font-semibold m-auto cursor-grab">
                {truncateString(book.story)}
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate(`/books/${book.book_num}/`);
                  }}
                  className="flex justify-center text-white bg-blue-400 border-0 mt-2 py-2 px-12 
                focus:outline-none hover:bg-blue-500 rounded-full mb-16"
                >
                  자세히보기
                </button>
              </div>
            </div>

            <img
              src={book?.cover_photo ? book.cover_photo : non_image}
              alt={book.title}
              className="lg:w-1/2 max-w-xs lg:h-96 max-h-xs object-fill object-center rounded-lg object-scale-down
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-90 inline-block cursor-pointer"
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            />
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
    <div className="mt-10">
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
              <img src={card} alt="" />
            </div>
            <div className="back">
              <img src={card2} alt=""></img>

              <p className=" absolute top-48 left-24 font-bold text-2xl text-gray-500">
                {book?.count_loans ? book.username : 'Unknown'}
                {book?.position
                  ? book.position
                  : !book?.count_loans && '과연 누가 될까요?'}
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

function RecommendedBooksSummary({ book }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-sm rounded  shadow-xl">
        <img
          className="w-[500px] h-[300px] object-scale-down cursor-pointer"
          src={book?.cover_photo ? book.cover_photo : non_image}
          alt={book.title}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <div className="px-6 py-4 cursor-pointer">
          <div
            className="font-bold text-xl mb-2 "
            onClick={() => {
              navigate(`/books/${book.book_num}`);
            }}
          >
            {book.title}
          </div>
          <p className="text-gray-700 text-base select-none">
            {truncateString(book.story)}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
            {book.category && `#${book.category}`}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 select-none">
            #{book.writer}
          </span>
        </div>
      </div>
    </>
  );
}

function ReviewSummary({ review, setReload }) {
  const [auth] = useAuth();
  const { book_num } = useParams();
  const [, setReviewDelete] = useState(false);
  const [input, setInput] = useState('');
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const timeStamp = () => {
    const today = new Date(review.updated_at);
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace('T', ' ').substring(0, 16);
  };

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
      alert('삭제되었습니다.');
      deleteReview().then(() => {
        setReload((prev) => !prev);
      });
    } else {
      handleCancleButton();
      alert('취소되었습니다.');
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

  const handleClick = () => {
    setInput(review.review_rate, review.review_content);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  console.log(review.updated_at);

  return (
    <div>
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {review && (
        <>
          <span className="flex justify-end">
            {auth?.username === review?.user_id && (
              <div className="mr-2 mt-4">
                <button
                  onClick={handleClick}
                  className="inline-flex border-2 border-blue-500 text-black hover:text-blue-600 rounded-full h-6 px-3 justify-center items-center"
                >
                  수정
                </button>
                <button
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="inline-flex ml-1 border-2 border-pink-500 text-black hover:text-pink-600 rounded-full h-6 px-3 justify-center items-center"
                >
                  삭제
                </button>
              </div>
            )}
          </span>
          <span className="flex mt-3">
            <h2 className="mr-4 ml-4 select-none">
              <RateIcon review_rate={review.review_rate} />
            </h2>
            <h1 className="font-extrabold select-none">{review?.user_id}</h1>
            <h2 className="ml-4 mb-4 select-none">{review?.review_content}</h2>
            <h2 className="ml-4 select-none text-gray-500 text-sm mt-0.5">
              {/* {timeStamp(review.updated_at)} */}
            </h2>
          </span>
          <div className="mb-4 pl-0.5 pr-0.5">
            {input ? (
              <ReviewForm value={review.review_id} onChange={handleChange} />
            ) : null}
          </div>
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
