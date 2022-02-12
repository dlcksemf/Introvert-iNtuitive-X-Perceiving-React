import DebugStates from 'base/DebugStates';

function WishBooks({ book }) {
  return (
    <div>
      {book.book_name.title}
      <DebugStates book={book} />
    </div>
  );
}
export default WishBooks;
