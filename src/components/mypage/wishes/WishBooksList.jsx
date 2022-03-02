import WishBooks from './WishBooks';
import NoList from '../NoList';

function WishBooksList({ wishBookList }) {
  return (
    <div>
      <div className="block w-full overflow-x-auto">
        {wishBookList?.length !== 0 ? (
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  도서명
                </th>
                <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  저자
                </th>
                <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  반납 상태
                </th>
                <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  반납 예정일
                </th>
              </tr>
            </thead>
            <tbody>
              {wishBookList?.slice(0, 3).map((book, index) => {
                return <WishBooks key={index} book={book} />;
              })}
            </tbody>
          </table>
        ) : (
          <NoList>찜할 도서를 찾으러 가요!</NoList>
        )}
      </div>
    </div>
  );
}
export default WishBooksList;
