import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import SearchBar from 'components/parts/SearchBar';
import { itemsPerPage } from 'Constants';
import Badge from 'designMaterials/Badge';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { STATELIST } from 'Constants';
import React from 'react';

function AdminLoanedBookList() {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(Object.keys(STATELIST.loaned)[0]);
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
        state: category === 'ALL' ? '' : category,
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category, query, getApplications],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [category, fetchApplications]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  const [, updateState] = useApiAxios(
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
    window.confirm('반납 상태를 변경하시겠습니까?') &&
      updateState({
        data: { return_state: 'R' },
        url: `/books/api/loanedbooks/${loan_num}/`,
        method: 'PATCH',
      }).then(() => {
        fetchApplications(page);
      });
  };

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <>
      <div className="w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-end justify-between">
            <p className="focus:outline-none text-base text-3xl font-bold leading-normal text-gray-800">
              대출 도서 관리
            </p>

            <div className="flex items-center">
              {Object.values(STATELIST.loaned).map((state, index) => (
                <div
                  key={index}
                  className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-2"
                >
                  <button
                    onClick={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={Object.keys(STATELIST.loaned)[index]}
                    className={`text-xs py-2 px-4 ${
                      category === Object.keys(STATELIST.loaned)[index] &&
                      'bg-indigo-100 text-indigo-700'
                    } text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full`}
                  >
                    {state}
                  </button>
                </div>
              ))}
              <div className="text-right mb-2 ml-5">
                <SearchBar
                  handleChange={setQuery}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <table className="w-full">
              <thead className="border border-gray-100 bg-gray-100 w-full">
                <tr className="focus:outline-none h-16 rounded w-full">
                  <td className="">
                    <div className="ml-5">
                      <div className="bg-gray-200 rounded-sm w-5 h-5 flex justify-center items-center relative">
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                        />
                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                          <svg
                            className="icon icon-tabler icon-tabler-check"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </td>

                  <th className="">
                    <div className="flex items-center cursor-default">
                      <p className="text-base font-medium leading-none text-gray-700">
                        대출자
                      </p>
                    </div>
                  </th>

                  <th className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        도서명
                      </p>
                    </div>
                  </th>

                  <th className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        대출 현황
                      </p>
                    </div>
                  </th>

                  <th className="pl-3">
                    <div className="flex items-center justify-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        상태
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {postList?.results?.map((post) => (
                  <React.Fragment key={post.loan_num}>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td className="flex items-center"></td>
                      <td className="">
                        <div className="flex items-center cursor-pointer">
                          <p className="text-base font-medium leading-none text-gray-700">
                            {post?.username}
                          </p>
                        </div>
                      </td>

                      <td className="pl-7">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {post?.title}
                          </p>
                        </div>
                      </td>

                      <td className="pl-7">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {post?.return_state === 'L' &&
                            new Date(post?.return_due_date) < new Date(date) ? (
                              <Badge color="red">
                                {Math.floor(
                                  (Date.parse(date) -
                                    Date.parse(post?.return_due_date)) /
                                    (1000 * 3600 * 24),
                                ) + '일 연체'}
                              </Badge>
                            ) : (
                              post?.return_state === 'L' && (
                                <Badge color="green">대출중</Badge>
                              )
                            )}
                            {post?.return_state === 'P' && (
                              <Badge color="yellow">반납 신청중</Badge>
                            )}
                            {post?.return_state === 'R' && (
                              <Badge color="blue">반납 완료</Badge>
                            )}
                          </p>
                        </div>
                      </td>

                      <td className="pl-7">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            <button
                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                              onClick={handleClickSubmitButton}
                              value={post.loan_num}
                            >
                              {post?.return_state === 'P' ? '반납 확인' : ''}
                            </button>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
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

      <div className="h-10"></div>
    </>
  );
}
export default AdminLoanedBookList;
