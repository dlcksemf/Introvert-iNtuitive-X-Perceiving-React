import LoanedBooks from './LoanedBooks';

function LoanedBooksList({ loanedBookList }) {
  return (
    <div className="flex">
      {loanedBookList?.map((book) => {
        return <LoanedBooks key={book.book_name.book_num} book={book} />;
      })}
    </div>
  );
}
export default LoanedBooksList;
