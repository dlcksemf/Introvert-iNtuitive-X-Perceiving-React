import { useCallback, useEffect, useState } from 'react';
import { STATELIST } from 'Constants';
import { useAuth } from 'base/hooks/Authcontext';
import { useApiAxios } from 'base/api/base';
import { itemsPerPage } from 'Constants';
import ReactPaginate from 'react-paginate';
import Badge from 'designMaterials/Badge';
import SearchBar from 'components/parts/SearchBar';
import React from 'react';

function AdminLoanedGameList() {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(Object.keys(STATELIST.loaned)[0]);
  const [auth] = useAuth();

  const [query, setQuery] = useState();

  let today = new Date();

  const [{ data: gameList }, getApplications] = useApiAxios(
    {
      url: '/game/api/loanedgame/',
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

  return (
    <>
      <div className="w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-end justify-between">
            <p className="select-none focus:outline-none text-2xl font-bold leading-normal text-gray-800">
              대여 게임 관리
            </p>

            <div className="flex items-center">
              {Object.values(STATELIST.game).map((state, index) => (
                <div
                  key={index}
                  className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-2"
                >
                  <button
                    onClick={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={Object.keys(STATELIST.game)[index]}
                    className={`text-xs py-2 px-4 ${
                      category === Object.keys(STATELIST.game)[index] &&
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
                    <div className="ml-5"></div>
                  </td>

                  <th className="">
                    <div className="flex items-center select-none">
                      <p className="text-sm leading-none text-gray-600">
                        대여자
                      </p>
                    </div>
                  </th>

                  <th className="pl-7">
                    <div className="flex items-center select-none">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        게임명
                      </p>
                    </div>
                  </th>

                  <th className="pl-7">
                    <div className="flex items-center select-none">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        게임 현황
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {gameList?.results?.map((game) => (
                  <React.Fragment key={game.loan_game_num}>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td className="flex items-center"></td>
                      <td className="">
                        <div className="flex items-center cursor-pointer">
                          <p className="text-base font-medium leading-none text-gray-700">
                            {game?.username}
                          </p>
                        </div>
                      </td>

                      <td className="pl-7">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                            {game?.game_name}
                          </p>
                        </div>
                      </td>

                      <td className="pl-7">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2 select-none">
                            {game?.return_state === 'L' &&
                            new Date(game.return_due_time) < today ? (
                              <Badge color="red"> 연체중 </Badge>
                            ) : (
                              game?.return_state === 'L' && (
                                <Badge color="green">대여중 </Badge>
                              )
                            )}

                            {game?.return_state === 'R' && (
                              <Badge color="blue">반납 완료</Badge>
                            )}
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

export default AdminLoanedGameList;
