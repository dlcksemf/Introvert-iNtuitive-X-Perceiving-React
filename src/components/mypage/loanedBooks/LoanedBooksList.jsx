import LoanedBooks from './LoanedBooks';
import { Link, useLocation } from 'react-router-dom';
import NoList from '../NoList';

function LoanedBooksList({ loanedBookList }) {
  let location = useLocation();

  const filtered_list = loanedBookList
    ?.filter((book) => book.return_state === 'L')
    .slice(0, 3);

  return (
    <div className="border-t-4 border-yellow-500">
      <section className="py-1 bg:gray-50">
        <div className="w-full xl:mb-0 px-0">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-10">
                  {/* <h3 className="font-semibold text-lg text-gray-800 text-top select-none">
                    대출 도서
                  </h3> */}
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-600 mt-3 text-white hover:bg-indigo-700 text-sm font-bold uppercase px-3 py-1 rounded-full
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 underline-offset-4"
                    type="button"
                  >
                    <Link
                      to={`/accounts/modal/loanedbooks/`}
                      state={{ backgroundLocation: location }}
                    >
                      전체 내역 보기
                    </Link>
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto text-gray-800 select-none">
              {filtered_list?.length === 0 ? (
                <NoList>대출할 도서를 찾으러 가요!</NoList>
              ) : (
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        도서명
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        저자
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        반납 날짜
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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
          </div>
        </div>
      </section>
    </div>
  );
}
export default LoanedBooksList;
