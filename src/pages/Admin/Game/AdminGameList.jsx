import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import SearchBar from 'components/parts/SearchBar';
import { itemsPerPage } from 'Constants';
import { useState, useEffect, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import AdminGameSummary from './AdminGameSummary';

function AdminGameList() {
  const [query, setQuery] = useState();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  const [{ data: gameList, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/?page_size=3`,
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

      const { data } = await refetch({ params });

      setPage(newPage);

      setPageCount(Math.ceil(data.count / 3));
      setCurrentItems(data?.results);
    },
    [query, refetch],
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
  }, [fetchApplications]);

  return (
    <div className="w-[1200px] m-auto mb-10">
      <ToastContainer />
      <div className="text-right mr-10">
        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
      </div>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {gameList && (
        <div className="flex flex-wrap">
          {gameList?.results?.map((game) => (
            <div
              key={game.game_num}
              // 여기 result 없애주세요
              className="w-full md:w-1/2 xl:w-1/3 px-4"
            >
              <AdminGameSummary game={game} />
            </div>
          ))}
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
}

export default AdminGameList;
