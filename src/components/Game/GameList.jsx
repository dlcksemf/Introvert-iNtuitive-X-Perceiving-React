import { useApiAxios } from 'base/api/base';
import SearchBar from 'components/parts/SearchBar';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GameSummary } from './GameSummary';

function GameList() {
  const navigate = useNavigate();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  let { state } = useLocation();
  let [searchParams] = useSearchParams();
  let pageParams = searchParams.get('page');
  let queryParams = searchParams.get('query');

  const [page, setPage] = useState(() => {
    return pageParams ? pageParams : 1;
  });

  const [query, setQuery] = useState(queryParams || '');

  const [{ data: gameList, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/?page_size=8`,
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(async () => {
    const params = {
      page: pageParams,
      query: queryParams,
    };

    const { data } = await refetch({ params });

    setPageCount(Math.ceil(data.count / 8));
    setCurrentItems(data?.results);
  }, [pageParams, queryParams, refetch]);

  useEffect(() => {
    page && navigate(`/game/gamelist/?page=${page}&query=${query}`);
  }, [page]);

  useEffect(() => {
    state?.pathname
      ? navigate(`/game/gamelist/?page=${pageParams}&query=${query}`)
      : navigate(`/game/gamelist/?page=1&query=${query}`);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [pageParams, queryParams]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/game/gamelist/?page=1&query=${query}`);
  };

  return (
    <>
      <div className="border-b-4 border-sky-600 w-[1140px] relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          전체 보드게임 목록
        </h2>
        <div className="flex select-none">
          <div className="absolute left-[888px] bottom-[10px]">
            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="container px-5 mx-auto h-full">
        <div className="flex flex-col text-center w-full">
          <div className="flex justify-end">
            <div className="absolute flex justify-end items-end top-[80px]">
              {loading && '로딩 중 ...'}
              {error && navigate(`*`)}
            </div>
          </div>
          <div className="flex flex-wrap mx-4 mb-10">
            {gameList?.results?.map((game) => (
              <React.Fragment key={game.game_num}>
                <GameSummary
                  game={game}
                  reloadGame={() => {
                    fetchApplications(page);
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="relative top-[20px] select-none">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          forcePage={page - 1}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="pagination"
        />
        <ToastContainer />
      </div>
    </>
  );
}
export default GameList;
