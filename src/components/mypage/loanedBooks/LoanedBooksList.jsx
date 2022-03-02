import LoanedBooks from './LoanedBooks';
import NoList from '../NoList';

function LoanedBooksList({ loanedBookList }) {
  const filtered_list = loanedBookList
    ?.filter((book) => book.return_state === 'L')
    .slice(0, 3);

  return (
    <div className="block w-full overflow-x-auto text-gray-800 select-none">
      {filtered_list?.length === 0 ? (
        <NoList>대출할 도서를 찾으러 가요!</NoList>
      ) : (
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
                반납 날짜
              </th>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                반납 신청
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered_list?.map((book) => {
              return <LoanedBooks key={book?.loan_num} book={book} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default LoanedBooksList;
