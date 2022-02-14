import { Link, useLocation } from 'react-router-dom';
import LoanedBooks from './LoanedBooks';

function LoanedBooksList({ loanedBookList }) {
  let location = useLocation();

  return (
    <div>
      {loanedBookList?.map((book) => {
        return <LoanedBooks key={book?.loan_num} book={book} />;
      })}

      <Link
        to={`/accounts/modal/loanedbooks/`}
        state={{ backgroundLocation: location }}
      >
        전체 내역 보기
      </Link>
    </div>
  );
}
export default LoanedBooksList;
