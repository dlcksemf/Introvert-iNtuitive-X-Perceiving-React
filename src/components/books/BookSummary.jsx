import { useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavy_reader.png';
import React, { useEffect, useState } from 'react';
import LoanedIcon from 'designMaterials/LoanedIcon';
import Toggle from 'components/parts/Toggle';
import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import LoanedModal from 'components/parts/LoanedModal';

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
  }, [auth, book]);

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
            <button
              onClick={handleClickLoan}
              className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <LoanedIcon />
            </button>
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
        <div className="flex-grow sm:pl-8 mt-36">
          <h3 className="text-sm text-gray-500 mb-3 select-none flex">
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
          <h3 className="mt-12 text-sm text-gray-500 select-none">
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
      </div>
    </div>
  );
}

function NewBookSummary({ book }) {
  const navigate = useNavigate();

  return (
    <>
      <h1
        className="text-5xl font-semibold mt-10 absolute left-6 top-14
      border-b-4 border-blue-300 py-2 hover:border-blue-500"
      >
        신간도서
      </h1>

      <section className="text-gray-600 body-font overflow-hidden mt-28">
        <div className="container mx-auto">
          <div className="lg:w-full mx-auto flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 m-auto">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                {book.category && `[ ${book.category} ]`}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 hover:font-bold">
                {book.title}
              </h1>
              <div className="flex mb-4">
                <div className="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                  {book.writer}
                </div>
              </div>
              <p className="leading-relaxed mb-4 hover:font-semibold m-auto">
                {truncateString(book.story)}
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate(`/books/${book.book_num}/`);
                  }}
                  className="flex justify-center text-white bg-indigo-600 border-0 mt-1 py-2 px-12 focus:outline-none hover:bg-indigo-700 rounded-full mb-16"
                >
                  자세히보기
                </button>
              </div>
            </div>

            <img
              src={book?.cover_photo ? book.cover_photo : non_image}
              alt={book.title}
              className="lg:w-1/2 max-w-xs lg:h-4/3 max-h-xs object-fill object-center rounded-lg
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-90 inline-block"
            />
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
      <h1
        className="text-5xl font-semibold mt-10 absolute left-8 top-16
      border-b-4 border-blue-300 py-2 hover:border-blue-500"
      >
        인기도서
      </h1>

      <section className="text-gray-600 body-font overflow-hidden mt-20">
        <div className="container mx-auto">
          <div className="lg:w-full mx-auto flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 m-auto">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                {book.category && `[ ${book.category} ]`}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 hover:font-bold">
                {book.title}
              </h1>
              <div className="flex mb-4">
                <div className="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                  {book.writer}
                </div>
              </div>
              <p className="leading-relaxed mb-4 hover:font-semibold m-auto">
                {truncateString(book.story)}
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate(`/books/${book.book_num}/`);
                  }}
                  className="flex justify-center text-white bg-indigo-600 border-0 mt-2 py-2 px-12 
                focus:outline-none hover:bg-indigo-700 rounded-full mb-16"
                >
                  자세히보기
                </button>
              </div>
            </div>

            <img
              src={book?.cover_photo ? book.cover_photo : non_image}
              alt={book.title}
              className="lg:w-1/2 max-w-xs lg:h-4/3 max-h-xs object-fill object-center rounded-lg
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-90 inline-block"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function HeavyReaderSummary({ book }) {
  return (
    <div>
      {book?.count_loans && (
        <span className="flex justify-center">
          <img
            src={heavy_reader}
            alt="다독왕"
            className="w-3/5 h-3/5 rounded inline"
          />
          {book?.gender === 'F' && (
            <p className="absolute mt-80">
              <h1 className="mt-10 text-4xl select-none font-semibold">
                EUCLID 다독왕 👸
              </h1>
            </p>
          )}
          {book?.gender === 'M' && (
            <p className="absolute mt-80">
              <h1 className="mt-10 text-4xl select-none font-semibold">
                EUCLID 다독왕 🤴
              </h1>
            </p>
          )}
          {!book?.gender && (
            <p className="absolute mt-80">
              <h1 className="mt-10 text-4xl select-none font-semibold">
                EUCLID 다독왕 🏆
              </h1>
            </p>
          )}
          <p className="absolute mt-96 flex justify-center font-bold">
            <h1
              className="mt-14 justify-center text-5xl select-none cursor-pointer
          transition duration-500 ease-in-out hover:scale-125 hover:text-blue-500"
            >
              {book.username}
            </h1>
          </p>
          <p className="absolute mt-96 font-semibold">
            {book?.position && (
              <h1 className="mt-36 text-3xl select-none">{book.position}</h1>
            )}
          </p>
        </span>
      )}
      {!book?.count_loans && (
        <span className="flex justify-center">
          <img
            src={heavy_reader}
            alt="다독왕"
            className="w-3/5 h-3/5 rounded inline"
          />
          <p className="absolute mt-80">
            <h1 className="mt-10 text-4xl select-none font-semibold">
              EUCLID 다독왕 🏆
            </h1>
          </p>
          <p className="absolute mt-96 flex justify-center font-bold">
            <h1
              className="mt-14 justify-center text-5xl select-none
              transition duration-500 ease-in-out hover:scale-125 hover:text-blue-500"
            >
              Unknown
            </h1>
          </p>
          <p className="absolute mt-96 font-semibold">
            <h1
              className="mt-36 text-3xl select-none cursor-pointer
              transition duration-500 ease-in-out hover:scale-125 hover:text-blue-500"
            >
              과연 누가 될까요?
            </h1>
          </p>
        </span>
      )}
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
