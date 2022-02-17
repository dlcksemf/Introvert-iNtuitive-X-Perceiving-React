import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import SearchBar from 'components/parts/SearchBar';
import StateCategory from 'components/parts/StateCategory';
import { itemsPerPage } from 'Constants';
import Badge from 'designMaterials/Badge';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const STATELIST = ['All', 'Loaned', 'Pending', 'Returned', 'Overdue'];

function AdminLoanedBookList() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState(STATELIST[0]);
  const [auth] = useAuth();

  const [query, setQuery] = useState();

  const [{ data: postList }, getApplications] = useApiAxios(
    {
      url: 'books/api/loanedbooks/',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        state: category === 'All' ? '' : category.slice(0, 1),
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category, query],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  const [{ loading, error }, updateState] = useApiAxios(
    {
      url: `/books/api/loanedbooks/${postList?.loan_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    const loan_num = e.target.value;
    window.confirm('반납 상태를 변경하시겠습니까?');
    updateState({
      data: { return_state: 'R' },
      url: `/books/api/loanedbooks/${loan_num}/`,
      method: 'PATCH',
    });
    // .then(() => {
    //   setColor('yellow');
    // });
    window.location.replace('/admin/loanedbook/');
  };

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <div>
      <div class="bg-white p-8 rounded-md w-full">
        <div class=" flex items-center justify-between pb-6">
          <div>
            <h2 class="text-gray-600 font-semibold">도서 대출 관리</h2>
          </div>

          <div class="flex items-center justify-between">
            <StateCategory
              stateList={STATELIST}
              selected={category}
              setSelected={setCategory}
            />

            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
          </div>
        </div>
        <div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대출자
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      도서명
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대출 현황
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      연체 일자
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      상태
                    </th>
                  </tr>
                </thead>
                {postList?.results?.map((post) => (
                  <tbody>
                    <tr>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {post?.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {post?.title}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                          {/* <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span> */}
                          <span class="relative">
                            {post?.return_state === 'L' &&
                            new Date(post?.return_due_date) < new Date(date) ? (
                              <Badge color="red">{post?.return_state}</Badge>
                            ) : (
                              post?.return_state === 'L' && (
                                <Badge color="green">
                                  {post?.return_state}
                                </Badge>
                              )
                            )}
                            {post?.return_state === 'P' && (
                              <Badge color="yellow">{post?.return_state}</Badge>
                            )}
                            {post?.return_state === 'R' && (
                              <Badge color="blue">{post?.return_state}</Badge>
                            )}
                          </span>
                        </span>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {post?.return_state === 'L' &&
                          new Date(post?.return_due_date) < new Date(date)
                            ? Math.floor(
                                (Date.parse(date) -
                                  Date.parse(post?.return_due_date)) /
                                  (1000 * 3600 * 24),
                              ) + '일 연체'
                            : post?.return_state === 'L' && '대출중'}
                          {post?.return_state === 'P' && '반납 신청중'}
                          {post?.return_state === 'R' && '반납 완료'}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                          onClick={handleClickSubmitButton}
                          value={post.loan_num}
                        >
                          {post?.return_state === 'P' ? '반납 확인' : ''}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      </div>
    </div>
  );
}
export default AdminLoanedBookList;
