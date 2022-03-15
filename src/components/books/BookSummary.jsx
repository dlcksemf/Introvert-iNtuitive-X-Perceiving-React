import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';

import LoanedModal from 'components/parts/LoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';

import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavyReader.jpg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
          transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-95"
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
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative h-[30rem] sm:h-96 w-[40rem] rounded-lg bottom-[38px]">
        <img
          src={heavy_reader}
          alt="다독왕"
          className="object-cover w-full h-full rounded-lg grayscale hover:grayscale-0"
        />

        <div className="absolute w-full h-full bottom-0 hover:bg-gradient-to-r from-indigo-700/30 to-blue-700 rounded-lg flex flex-col items-center justify-center text-center">
          <p className="animate__fadeIn text-2xl px-14 text-gray-300 mt-10 select-none">
            유클리드의 자랑
          </p>

          <p className="text-5xl font-bold px-14 text-gray-300 mt-3 select-none">
            {book?.count_loans ? book.username : 'Unknown'}
          </p>

          <p className="text-xl font-light px-14 text-gray-300 select-none">
            {book?.position
              ? book.position
              : !book?.count_loans && '과연 누가 될까요?'}
          </p>
        </div>
      </div>
    </div>
    // <div>
    //   <span className="flex justify-center relative">
    //     <img
    //       src={heavy_reader}
    //       alt="다독왕"
    //       className="bg-cover h-56 w-screen rounded inline mr-20 mt-20 grayscale hover:grayscale-0"
    //     />
    //     <h1 className="relative text-center text-4xl select-none font-semibold">
    //       EUCLID 다독왕
    //     </h1>

    //     <div
    //       className="mt-10 before:block before:absolute before:-inset-1 before:-skew-y-12
    //   before:bg-gradient-to-r from-blue-200 via-blue-400 to-blue-700 relative inline-block justify-center items-center"
    //     >
    //       <h1
    //         className="mt-7 flex justify-center text-5xl select-none cursor-default font-extrabold
    //   transition duration-500 ease-in-out hover:scale-125 relative italic"
    //       >
    //         {book?.count_loans ? book.username : 'Unknown'}
    //       </h1>{' '}
    //     </div>

    //     <h1 className="flex justify-center text-3xl select-none mt-14">
    //       {book?.position
    //         ? book.position
    //         : !book?.count_loans && '과연 누가 될까요?'}
    //     </h1>
    //   </span>
    // </div>
  );
}

function ReviewSummary({ review }) {
  return (
    <div>
      <h1 className="mt-4">{review?.user_id}</h1>
      <span className="flex">
        <h2 className="mr-4">{review?.review_rate}</h2>
        <h2 className="mr-4">{review?.review_content}</h2>
        <h2>{review?.created_at}</h2>
      </span>
    </div>
  );
}

export {
  BookSummary,
  NewBookSummary,
  Top5Summary,
  HeavyReaderSummary,
  ReviewSummary,
};
