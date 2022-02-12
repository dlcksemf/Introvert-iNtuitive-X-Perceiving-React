import WishBooks from './WishBooks';

function WishBooksList({ wishBookList }) {
  return (
    <div className="flex">
      {wishBookList?.map((book) => {
        return <WishBooks key={book.book_num} book={book} />;
      })}
    </div>
  );
}
export default WishBooksList;
