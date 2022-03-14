import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import SearchBar from 'components/parts/SearchBar';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AdminGameSummary from './AdminGameSummary';

function AdminGameList() {
  const [query, setQuery] = useState();

  const [{ data: gameList, loading, error }, refetch] = useApiAxios(
    {
      url: `game/api/game${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchGame = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div className="my-5 cursor-pointer">
      <ToastContainer />
      {/* <div className="text-right mb-2 mr-4 absolute left-3/4 top-24 ml-36">
        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
      </div> */}

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {gameList && (
        <div className="flex flex-wrap">
          {gameList?.map((game) => (
            <div
              key={game.game_num}
              className="w-full md:w-1/2 xl:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300"
            >
              <AdminGameSummary game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGameList;
