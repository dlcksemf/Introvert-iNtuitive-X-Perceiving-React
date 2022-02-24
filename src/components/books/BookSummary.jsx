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

  return (
    <div className="p-4 lg:w-1/2">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          alt={book?.title}
          className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 cursor-pointer
          transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
          src={book?.cover_photo ? book?.cover_photo : non_image}
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        />
        <div className="flex-grow sm:pl-8">
          <h3 className="text-sm text-gray-500 mb-3 select-none">
            {book.category && `[ ${book.category} ]`}
          </h3>
          <span className="absolute inline-flex m-auto pl-80">
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
                onClick={() => setModalIsOpen(true)}
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
          <h2
            className="absolute title-font font-medium text-lg text-black hover:text-blue-500 cursor-pointer grid
           transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 hover:font-semibold"
            onClick={() => {
              navigate(`/books/${book.book_num}/`);
            }}
          >
            {book.title}
          </h2>
          <h3 className="text-sm text-gray-500 mb-3 mt-11 select-none">
            {book.writer}
          </h3>
          <p className="font-medium text-base mb-4 select-none">
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
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-auto">
        <div className="lg:w-2/3 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {book.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {book.title}
            </h1>
            <div className="flex mb-4">
              <div className="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                {book.writer}
              </div>
            </div>
            <p className="leading-relaxed mb-4">{truncateString(book.story)}</p>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Button
              </button>
            </div>
          </div>

          <img
            src={book?.cover_photo ? book.cover_photo : non_image}
            alt={book.title}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-scale-down object-center rounded"
          />
        </div>
      </div>
    </section>
  );
}

function Top5Summary({ book }) {
  const navigate = useNavigate();

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-auto">
        <div className="lg:w-2/3 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {book.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {book.title}
            </h1>
            <div className="flex mb-4">
              <div className="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                {book.writer}
              </div>
            </div>
            <p className="leading-relaxed mb-4">{truncateString(book.story)}</p>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Button
              </button>
            </div>
          </div>

          <img
            src={book?.cover_photo ? book.cover_photo : non_image}
            alt={book.title}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-scale-down object-center rounded"
          />
        </div>
      </div>
    </section>
  );
}

function HeavyReaderSummary({ book }) {
  return (
    <div>
      <span className="flex justify-center">
        <img
          src={heavy_reader}
          alt="다독왕"
          className="w-3/5 h-3/5 rounded inline"
        />
        <h1 className="absolute mt-96 text-3xl select-none">
          이달의 EUCLID 다독왕
        </h1>
      </span>
      <span className="flex justify-center">
        <h1 className="absolute text-4xl select-none">{book.username}</h1>
        {book?.position && (
          <h1 className="absolute text-4xl select-none">{book.position}</h1>
        )}
      </span>
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
