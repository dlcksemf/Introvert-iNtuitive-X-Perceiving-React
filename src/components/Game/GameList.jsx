import { useApiAxios } from 'base/api/base';
import SearchBar from 'components/parts/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GameSummary } from './GameSummary';

function GameList() {
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
    <div className="my-5 cursor-pointer">
      <ToastContainer />
      <div className="text-right mb-2 mr-4 absolute left-3/4 top-24 ml-36">
        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
      </div>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {gameList && (
        <div className="flex flex-wrap">
          {gameList?.results?.map((game) => (
            <div
              key={game.game_num}
              className="w-full md:w-1/2 xl:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300"
            >
              <GameSummary game={game} />
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
export default GameList;
