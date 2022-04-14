import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import { useAuth } from 'base/hooks/Authcontext';
import GameLoanedModal from 'components/parts/GameLoanedModal';
import GameReviewPage from 'pages/GameReviewPage';
import { GameLoanedIcon } from 'designMaterials/LoanedIcon';

function GameDetail({ gameId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [reloading, setReloading] = useState(false);
  const [auth] = useAuth();
  let location = useLocation();
  let { pathname, state } = location;

  const [{ data: game, loading, error }, refetch] = useApiAxios(
    {
      url: `/game/api/game/${gameId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [refetch, reloading]);

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요') &&
        navigate('/accounts/login/');
  };

  const reload = () => {
    refetch();
  };

  const buyLink = () => {
    window.open(
      `https://www.boardgamemall.co.kr/goods/goods_search.php?adUrl=%2Fgoods%2Fgoods_view.php%3FgoodsNo%3D1000007636&keyword=${game.game_name}`,
      '_blank',
    );
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && navigate(`*`)}
      {game && (
        <>
          <div className="border-b-4 border-sky-600 w-3/4 relative left-[200px]">
            <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
              보드게임 상세 정보
            </h2>
          </div>
          <div className="relative top-[40px] left-[325px] w-[200px] select-none">
            {game?.game_cover_photo && (
              <img
                src={game?.game_cover_photo}
                alt={game?.game_name}
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
            {!game?.game_cover_photo && (
              <img
                src={non_image}
                alt="non_image"
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
          </div>
          <section
            className="text-left text-gray-600 select-none
          relative left-[580px] bottom-[140px] w-[890px]"
          >
            {game?.player_num && (
              <h2 className="mb-2">게임인원 : [ {game?.player_num} ]</h2>
            )}
            <h1 className="mb-2">게임명 : {game?.game_name}</h1>
            <h1 className="mb-2">게임시간 : {game?.play_time}</h1>
            <h1 className="mb-2">난이도 : {game?.level}</h1>
            <h1 className="mb-2">수 량 : {game?.game_amount}</h1>

            <div className="flex">
              <div
                className="relative right-[245px] top-[40px] focus:outline-none select-none rounded 
                text-center border bg-indigo-600 w-[180px] h-[45px]"
              >
                <button onClick={buyLink} className="font-bold text-white my-2">
                  보드게임몰에서 게임찾기
                </button>
              </div>

              <span className="flex relative top-[44px] right-[190px]">
                {game?.game_state === 'A' && (
                  <>
                    <span className="text-gray-600 select-none relative top-[7px] left-[10px]">
                      대여하기
                    </span>
                    <div
                      onClick={handleClickLoan}
                      className="relative left-[2px]"
                    >
                      <GameLoanedIcon />
                    </div>
                  </>
                )}

                {game?.game_state !== 'A' && (
                  <>
                    <h1 className="select-none relative left-[10px] top-[8px]">
                      반납 예정 시간 ::
                    </h1>
                    <p className="select-none relative left-[14px] top-[8px] hover:text-sky-600">
                      {game?.loaned_game[0]?.return_due_time
                        .replace('T', ' ')
                        .substring(0, 16)}
                    </p>
                  </>
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
          </section>
          <div className="leading-relaxed w-[850px] select-none relative left-[300px] bottom-[10px]">
            <h1 className="text-2xl font-bold relative bottom-[10px]">
              게임소개
            </h1>
            {game?.game_rule.split(/[\r\n]+/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <Link
            to={
              state?.beforeLocation
                ? `/game/gamelist/${state.beforeLocation}`
                : `/game/gamelist/`
            }
            state={{ pathname: pathname }}
          >
            <div
              className="relative left-[300px] top-[30px] focus:outline-none select-none rounded
              border bg-indigo-600 w-[100px] h-[50px]"
            >
              <h1 className="font-bold text-white text-center my-2.5">
                목록으로
              </h1>
            </div>
          </Link>
          <div className="flex justify-center select-none">
            <h1 className="text-2xl font-bold relative top-[110px] left-[106px] select-none">
              한줄평
            </h1>
            <div className="relative top-[145px] left-[5px]">
              <GameReviewPage game={game} setReload={setReloading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default GameDetail;
