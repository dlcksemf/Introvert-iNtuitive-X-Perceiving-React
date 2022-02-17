import { Link } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';

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
    <div>
      {book?.cover_photo && (
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
        {book.title} - {book.writer}
      </Link>
    </div>
  );
}

function Top5Summary({ book }) {
  return (
    <div>
      {book?.cover_photo && (
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
        {book.title} - {book.writer}
      </Link>
    </div>
  );
}

function HeavyReaderSummary({ book }) {
  return (
    <div>
      <p>{book.username}</p>
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
