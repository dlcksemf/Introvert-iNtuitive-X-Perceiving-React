import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATELIST, itemsPerPage } from 'Constants';
import SearchBar from '../SearchBar';
import ReactPaginate from 'react-paginate';
import StateCategory from '../StateCategory';
import GameModalComponent from './GameModalComponent';

const TitleList = {
  loanedgame: {
    game_name: '게임명',
    loaned_time: '대여 시간',
    return_due_time: '반납 예정 시간',
    returned_time: '반납 시간',
    return_state: '반납 상태',
  },
};

function GameModal({ modalType }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [state, setState] = useState('ALL');

  const [stateType] = useState(() => {
    if (modalType === 'loanedgame') {
      return 'game';
    }
  });

  const [query, setQuery] = useState('');

  const [{ data }, getUserInfo] = useApiAxios(
    {
      url: `/game/api/loanedgame/?user_id=${auth.user_id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const fetchUserInfo = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        email: auth.email,
        page: newPage,
        query: newQuery,
        return_state: state === 'ALL' ? '' : state,
      };

      const { data } = await getUserInfo({ params });

      setPage(newPage);
      setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [auth, state, query, getUserInfo],
  );

  useEffect(() => {
    fetchUserInfo(1);
  }, [fetchUserInfo, state]);

  const handlePageClick = (event) => {
    fetchUserInfo(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchUserInfo(1, query);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="border-b dark:border-gray-600">
        <div className="flex justify-between items-start p-5 rounded-t">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white select-none">
            게임 대여 내역
          </h3>

          <div className="absolute right-72 mt-8">
            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
          </div>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="ml-4 mb-3">
          <StateCategory
            setCategory={setState}
            category={state}
            stateObject={STATELIST['game']}
          />
        </div>
      </div>
      <div className="p-6 ">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <div className="p-3">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 select-none">
                <tr>
                  {Object.values(TitleList['loanedgame']).map(
                    (tableTitle, index) => {
                      return (
                        <React.Fragment key={index}>
                          <th className="p-2 whitespace-nowrap font-semibold text-left">
                            {tableTitle}
                          </th>
                        </React.Fragment>
                      );
                    },
                  )}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 select-none">
                {data?.results?.map((game, index) => (
                  <tr key={index}>
                    <GameModalComponent
                      gameInfo={game}
                      titleList={Object.keys(TitleList['loanedgame'])}
                      modalType={stateType}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5">
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
export default GameModal;
