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

  const [{ data: userdata }, refresh] = useApiAxios(
    {
      url: '/accounts/api/users/',
      method: 'GET',
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
      setPageCount(Math.ceil(data?.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query, refresh],
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  return (
    <>
      <div className="w-[1200px] m-auto">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="flex items-end justify-between">
            <p className="focus:outline-none text-2xl font-bold leading-normal text-gray-800 select-none">
              회원 관리
            </p>

            <div className="flex items-center">
              <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
            </div>
          </div>

          <div className="mt-7">
            <table className="w-full">
              <tbody>
                <tr
                  className="focus:outline-none h-16 border border-gray-100 bg-gray-100 rounded
                font-semibold text-dark"
                >
                  <td className="">
                    <div className="ml-5"></div>
                  </td>
                  <td className="">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 select-none">
                        이름
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                        이메일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                        가입일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                        대출 빈도
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                        포인트
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                        삭제
                      </p>
                    </div>
                  </td>
                </tr>
                {userdata?.results?.map((user, book) => (
                  <React.Fragment key={user.user_id}>
                    {user.is_staff === false && (
                      <tr className="focus:outline-none h-16 border border-gray-100 rounded select-none">
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
