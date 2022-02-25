import LoanedBooks from './LoanedBooks';
import { Link, useLocation } from 'react-router-dom';
import NoList from '../NoList';

function LoanedBooksList({ loanedBookList }) {
  let location = useLocation();

  const filtered_list = loanedBookList?.filter(
    (book) => book.return_state === 'L',
  );

  return (
    <div>
      <section class="py-1 bg-blueGray-50">
        <div class="w-full xl:mb-0 px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">
                    대출 도서
                  </h3>
                </div>
                <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

            <div class="block w-full overflow-x-auto">
              {filtered_list?.length === 0 ? (
                <NoList>대출할 도서를 찾으러 가요!</NoList>
              ) : (
                <table class="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        도서명
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        저자
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        반납 날짜
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        반납 신청
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
