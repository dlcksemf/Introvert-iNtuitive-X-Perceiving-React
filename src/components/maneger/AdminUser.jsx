import React, { useState, useEffect, useCallback } from 'react';
import { useApiAxios } from 'base/api/base';
import AdminTopNav from './AdminTopNav';
import AdminUserList from './AdminUserList';
import ReactPaginate from 'react-paginate';
import SearchBar from 'components/parts/SearchBar';

function AdminUser() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  // const [checkList, setCheckList] = useState([]);
  // const [isAllChecked, setIsAllChecked] = useState(false);
  const [query, setQuery] = useState();

  const [{ data: userdata, loading, error }, refresh, deleteUser] = useApiAxios(
    {
      url: 'accounts/api/users/',
      methid: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(async (newPage, newQuery = query) => {
    const params = {
      page: newPage,
      query: newQuery,
    };

    const { data } = await refresh({ params });

    setPage(newPage);
    setPageCount(Math.ceil(data?.count / 2));
    setCurrentItems(data?.results);
  }, []);

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
    <div className="flex">
      <AdminTopNav />
      <div className="flex justify-center">
        <div className="ml-20">유저목록</div>

        <div className="mt-5 mb-2">
          {loading && '유저 목록을 가져오는 중입니다.'}
          {error && '목록을 가져오는 중 에러가 발생했습니다.'}
          <div>
            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />

            {userdata?.results?.map((user, index) => (
              <AdminUserList user={user} />
            ))}
          </div>

          <>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="pagination"
            />
          </>
        </div>
      </div>
      {/* <DebugStates userdata={userdata} loading={loading} error={error} /> */}
    </div>
  );
}

export default AdminUser;
