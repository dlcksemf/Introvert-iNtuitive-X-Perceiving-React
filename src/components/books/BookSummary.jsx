import { Link } from 'react-router-dom';

function BookSummary({ book }) {
  return (
    <div>
      {book.photo && (
        <img
          src={book.photo}
          alt={book.title}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      <Link to={`/books/${book.book_num}/`}>
        {book.title} [ {book.writer} ]
      </Link>
    </div>
  );
}

export default BookSummary;
