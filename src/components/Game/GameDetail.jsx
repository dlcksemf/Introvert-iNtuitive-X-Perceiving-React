import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import { useAuth } from 'base/hooks/Authcontext';
import LoanedIcon from 'designMaterials/LoanedIcon';
import LoanedModal from 'components/parts/LoanedModal';
import GameLoanedModal from 'components/parts/GameLoanedModal';

function GameDetail({ gameId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [{ data: game, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/${gameId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요🎈') &&
        navigate('/accounts/login/');
  };

  const reload = () => {
    refetch();
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && navigate(`*`)}
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
                    <Link to="/game/gamelist/">
                      <div
                        className="flex m-auto ml-auto 
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        목록으로
                      </div>
                    </Link>
                  </div>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    {game?.game_state === 'A' && (
                      <>
                        <span className="text-gray-600 m-auto select-none">
                          대여하기
                        </span>
                        <div
                          onClick={handleClickLoan}
                          className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                          <LoanedIcon />
                        </div>
                      </>
                    )}

                    {game?.game_state !== 'A' && (
                      <p className="m-auto select-none hover:text-blue-500">
                        반납 예정 시간 :{game?.loaned_game[0]?.return_due_time}
                      </p>
                    )}
                    <GameLoanedModal
                      ariaHideApp={false}
                      modalIsOpen={modalIsOpen}
                      setModalIsOpen={setModalIsOpen}
                      game_num={game?.game_num}
                      reload={reload}
                    />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default GameDetail;