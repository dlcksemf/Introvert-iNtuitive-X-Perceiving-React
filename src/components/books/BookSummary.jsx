import { Link } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavy_reader.png';

function BookSummary({ book }) {
  return (
    <div className="flex flex-wrap -m-4">
      <div className="p-4 lg:w-1/2">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          {book?.cover_photo && (
            <a href={`/books/${book.book_num}/`}>
              <img
                alt={book?.title}
                className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                src={book?.cover_photo}
              />
            </a>
          )}
          {!book?.cover_photo && (
            <Link to={`/books/${book.book_num}/`}>
              <img
                alt="non_image"
                className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                src={non_image}
              />
            </Link>
          )}
          <div className="flex-grow sm:pl-8">
            <h3 className="text-gray-500 mb-3 select-none">{book?.category}</h3>
            <h2 className="title-font font-medium text-lg text-gray-900">
              <Link to={`/books/${book.book_num}/`}>{book?.title}</Link>
            </h2>
            <h3 className="text-gray-500 mb-3 select-none">{book?.writer}</h3>
            <p className="mb-4 truncate text-clip overflow-hidden select-none">
              {book?.story}
            </p>
            <span className="inline-flex"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewBookSummary({ book }) {
  return (
    <>
      <div className="w-screen h-screen">
        {book?.cover_photo && (
          <img
            src={book.cover_photo}
            alt={book.title}
            className="w-fix h-fix rounded inline"
          />
        )}
        {!book?.cover_photo && (
          <img
            src={non_image}
            alt="non_image"
            className="w-fix h-fix rounded inline"
          />
        )}
      </div>
      <div className="relative text-center">
        <Link to={`/books/${book.book_num}/`}>
          <h1 className="underline decoration-double underline-offset-4 capitalize inline-block align-text-top">
            {book.title} - {book.writer}
          </h1>
          <h3 className="leading-loose tracking-wide ordinal">{book.story}</h3>
        </Link>
      </div>
    </>
  );
}

function Top5Summary({ book }) {
  return (
    <>
      <div className="w-screen h-screen">
        {book?.cover_photo && (
          <img
            src={book.cover_photo}
            alt={book.title}
            className="w-fix h-fix rounded inline"
          />
        )}
        {!book?.cover_photo && (
          <img
            src={non_image}
            alt="non_image"
            className="w-fix h-fix rounded inline"
          />
        )}
      </div>
      <div className="absolute top-20 left-20 px-20 py-20">
        <h4 class="mb-3 text-xl font-semibold tracking-tight text-white">
          <p class="leading-normal text-gray-100">
            <Link to={`/books/${book.book_num}/`}>
              {book.title} - {book.writer}
            </Link>
          </p>
        </h4>
      </div>
    </>
  );
}

function HeavyReaderSummary({ book }) {
  return (
    <div>
      <img
        src={heavy_reader}
        alt="다독왕"
        className="w-screen h-screen rounded inline"
      />
      <div className="absolute top-20 left-20 px-20 py-20">
        <h4 class="mb-3 text-xl font-semibold tracking-tight text-white">
          <p class="leading-normal text-gray-100">{book.username}</p>
        </h4>
      </div>
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
