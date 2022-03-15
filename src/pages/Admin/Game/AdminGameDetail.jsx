import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';

function AdminGameDetail({ gameId }) {
  const navigate = useNavigate();
  const [{ data: game, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/${gameId}/`,
      method: 'GET',
    },
    { maual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteGame] =
    useApiAxios(
      {
        url: `/game/api/game/${gameId}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    window.confirm('게임을 삭제하시겠습니까?') &&
      deleteGame().then(() => {
        navigate('/admin/gamelist/');
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {error &&
        `로딩 중 에러(${deleteError.response.status} ${deleteError.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {game && (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {game?.game_cover_photo && (
                  <img
                    src={game?.game_cover_photo}
                    alt={game?.game_name}
                    className="lg:w-2/6 w-full lg:h-2/6 h-64 object-cover object-center ml-28 mr-10 mt-14
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:skew-y-6"
                  />
                )}
                {!game?.game_cover_photo && (
                  <img
                    src={non_image}
                    alt="non_image"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  />
                )}
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-5 select-none
                  hover:font-semibold"
                  >
                    {game?.game_name}
                  </h1>

                  <div className="flex mb-4 select-none">
                    <span className="flex py-2 select-none">
                      플레이어 수:{game?.player_num}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      플레이 시간:{game?.play_time}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      난이도:{game?.level}
                    </span>
                  </div>
                  <div className="leading-relaxed select-none mt-14 hover:text-gray-900">
                    {game?.game_rule.split(/[\r\n]+/).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>

                  <div className="flex justify-start">
                    <Link to="/admin/gamelist/">
                      <div
                        className="flex m-auto ml-auto 
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        목록으로
                      </div>
                    </Link>
                    <Link to={`/admin/game/${gameId}/edit/`}>
                      <div
                        className="flex m-auto ml-52
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        수정
                      </div>
                    </Link>
                    <div className="flex">
                      <button
                        disabled={deleteLoading}
                        onClick={handleDelete}
                        className="flex m-auto ml-5
                      text-gray-600 hover:text-blue-500 hover:font-bold 
                      border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                      transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default AdminGameDetail;
