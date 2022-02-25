import React, { useState, useEffect, useCallback } from 'react';
import { useApiAxios } from 'base/api/base';
import AdminUserList from './AdminUserList';
import ReactPaginate from 'react-paginate';
import SearchBar from 'components/parts/SearchBar';
import { itemsPerPage } from 'Constants';

function AdminUser() {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState();

  const [{ data: userdata, loading, error }, refresh] = useApiAxios(
    {
      url: 'accounts/api/users/',
      methid: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };

      const { data } = await refresh({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data?.count / 2));
      setCurrentItems(data?.results);
    },
    [query],
  );

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="flex items-end justify-between">
            <p className="focus:outline-none text-base text-3xl font-bold leading-normal text-gray-800">
              회원 관리
            </p>

            <div className="flex items-center">
              <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
            </div>
          </div>

          <div className="mt-7">
            <table className="w-full">
              <tbody>
                <tr className="focus:outline-none h-16 border border-gray-100 bg-gray-100 rounded">
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
                  <td className="">
                    <div className="flex items-center cursor-default">
                      <p className="text-base font-medium leading-none text-gray-700">
                        이름
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        이메일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        가입일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        대출 빈도
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        삭제
                      </p>
                    </div>
                  </td>
                </tr>

                {userdata?.results?.map((user) => (
                  <React.Fragment key={user.user_id}>
                    {user.is_staff == 0 && (
                      <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <AdminUserList
                          user={user}
                          reload={() => {
                            fetchApplications(page);
                          }}
                        />
                      </tr>
                    )}
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

export default AdminUser;
