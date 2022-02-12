import DebugStates from 'base/DebugStates';

function LoanedBooks({ book }) {
  return (
    <div>
      {book.book_name.title}
      <DebugStates book={book} />
    </div>
  );
}
export default LoanedBooks;
