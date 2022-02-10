import { Link } from 'react-router-dom';

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
      {book.cover_photo && (
        <img
          src={book.cover_photo}
          alt={book.title}
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
      {book.cover_photo && (
        <img
          src={book.cover_photo}
          alt={book.title}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      <Link to={`/loanedbooks/${book.book_num}/`}>
        {book.title} - {book.writer}
      </Link>
    </div>
  );
}

function HeavyReaderSummary({ loanedBook }) {
  return (
    <div>
      {/* {loanedBook.cover_photo && (
        <img
          src={loanedBook.cover_photo}
          alt={loanedBook.title}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )} */}
      <Link to={`/loanedbooks/${loanedBook.email}/`}>
        {loanedBook.username}
      </Link>
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
