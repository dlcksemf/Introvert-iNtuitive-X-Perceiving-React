import LoanedBooks from './LoanedBooks';

function LoanedBooksList({ loanedBookList }) {
  return (
    <div>
      {loanedBookList?.map((book) => {
        return <LoanedBooks key={book.book_name.book_num} book={book} />;
      })}
    </div>
  );
}
export default LoanedBooksList;
