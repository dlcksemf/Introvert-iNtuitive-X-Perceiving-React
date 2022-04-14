import { useApiAxios } from 'base/api/base';
import SearchBar from 'components/parts/SearchBar';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GameSummary } from './GameSummary';

function GameList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  let [searchParams] = useSearchParams();
  let pageParams = searchParams.get('page');

  const [page, setPage] = useState(() => {
    return pageParams ? pageParams : 1;
  });

  let location = useLocation();
  let queryParams = searchParams.get('query');

  const [{ data: gameList, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/?page_size=8`,
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

      setPageCount(Math.ceil(data.count / 8));
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

  useEffect(() => {
    page && navigate(`/game/gamelist/?page=${page}&query=${query}`);
  }, [page]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col text-center w-full">
            <div className="flex justify-end">
              <h1
                className="text-2xl font-semibold title-font text-gray-900 tracking-widest m-auto mt-10
              select-none"
              >
                전체 게임 목록
              </h1>
              <div className="absolute flex justify-end items-end top-[80px]">
                <div className="mr-10">
                  <SearchBar
                    handleChange={setQuery}
                    handleSubmit={handleSubmit}
                  />
                </div>
                {loading && '로딩 중 ...'}
                {error && navigate(`*`)}
              </div>
            </div>
            <div className="flex flex-wrap mx-4 mb-10">
              {gameList?.results?.map((game) => (
                <React.Fragment key={game.game_num}>
                  <GameSummary game={game} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mt-14">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
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
