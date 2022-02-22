import { Link } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavy_reader.png';

function BookSummary({ book }) {
  return (
    <div>
      {book.cover_photo && (
        <img
          src={book.cover_photo}
          alt={book.title}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      {!book?.cover_photo && (
        <img
          src={non_image}
          alt="non_image"
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      <Link to={`/books/${book.book_num}/`}>
        [ {book.category_id} ] {book.title} - {book.writer}{' '}
        {book.return_due_date}
      </Link>
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
