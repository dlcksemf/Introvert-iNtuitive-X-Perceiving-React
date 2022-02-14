import WishBooks from './WishBooks';
import { Link, useLocation } from 'react-router-dom';

function WishBooksList({ wishBookList }) {
  let location = useLocation();

  return (
    <div>
      {wishBookList?.map((book, index) => {
        return <WishBooks key={index} book={book} />;
      })}

      <Link
        to={`/accounts/modal/wishes/`}
        state={{ backgroundLocation: location }}
      >
        전체 내역 보기
      </Link>
    </div>
  );
}
export default WishBooksList;
