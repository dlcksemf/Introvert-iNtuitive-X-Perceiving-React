import { Link, useLocation, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { RateIcon } from 'designMaterials/RateIcon';
import GameLoanedModal from 'components/parts/GameLoanedModal';
import { GameLoanedIcon } from 'designMaterials/LoanedIcon';

function truncateString(str) {
  if (str.length > 70) {
    return str.slice(0, 70) + '...';
  } else {
    return str;
  }
}
function GameSummary({ game }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let location = useLocation();

  const [{}, refetch] = useApiAxios(
    {
      url: `/game/api/game/`,
      method: 'GET',
    },
    { manual: true },
  );

  const handleClickLoan = () => {
    auth.isLoggedIn
      ? setModalIsOpen(true)
      : window.confirm('로그인 후 이용해주세요') &&
        navigate('/accounts/login/');
  };

  const reload = () => {
    refetch();
  };

  return (
    <div class="mt-10 mb-10 ml-4 max-w-sm w-[550px] lg:max-w-full lg:flex relative left-[163px] top-[30px] select-none">
      <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
        <Link
          to={`/game/${game.game_num}/`}
          state={{ beforeLocation: location.search }}
        >
          <img
            alt={game.game_name}
            src={game?.game_cover_photo ? game?.game_cover_photo : non_image}
          />
        </Link>
      </div>
      <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            {game?.player_num && `[ ${game?.player_num} ]`}
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">
            <Link
              to={`/game/${game.game_num}/`}
              state={{ beforeLocation: location.search }}
            >
              <h2>{game.game_name}</h2>
            </Link>
          </div>
          <div class="text-sm text-gray-600">
            <h2>
              {game.level} | {game.play_time} | {game.game_amount} 개
            </h2>
          </div>
          <div class="text-gray-700 text-base text-left mt-1.5">
            <h2>
              {game.game_rule
                ? truncateString(game.game_rule)
                : truncateString('')}
            </h2>
          </div>
        </div>
        <div class="flex items-center relative">
          {game?.game_state === 'A' ? (
            <div onClick={handleClickLoan} className="flex">
              <h1>대여하기</h1>
              <h1 className="relative bottom-2">
                <GameLoanedIcon />
              </h1>
            </div>
          ) : (
            <div className="flex">
              <h1>반납 예정 |</h1>
              <h1 className="relative left-1 hover:text-sky-600">
                {game?.loaned_game[0]?.return_due_time
                  .replace('T', ' ')
                  .substring(0, 16)}
              </h1>
            </div>
          )}
          <GameLoanedModal
            ariaHideApp={false}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            game_num={game?.game_num}
            reload={reload}
          />
        </div>
      </div>
    </div>
  );
}

function GameReviewSummary({ review, setReload }) {
  const [auth] = useAuth();
  const [, setReviewDelete] = useState(false);

  const [
    { loading: deleteLoading, error: deleteError },
    deleteReview,
    refetch,
  ] = useApiAxios(
    {
      url: `/game/api/gamereview/${review?.game_review_num}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('한줄평을 삭제하시겠습니까?')) {
      handleOkButton();
      deleteReview().then(() => {
        setReload((prev) => !prev);
      });
    } else {
      handleCancleButton();
    }
    setReviewDelete(true);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOkButton = () => {
    setReviewDelete(true);
  };

  const handleCancleButton = () => {
    setReviewDelete(false);
  };

  return (
    <div>
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {review && (
        <>
          {auth?.user_id === review?.user_id && (
            <div className="flex justify-end relative top-4 right-4">
              <button disabled={deleteLoading} onClick={handleDelete}>
                <p className="text-gray-500 text-sm hover:text-sky-600">삭제</p>
              </button>
            </div>
          )}
          <span className="flex m-auto">
            <h2 className="mr-4 ml-4 select-none">
              <RateIcon review_rate={review.game_review_rate} />
            </h2>
            <h1 className="font-extrabold select-none">{review?.username}</h1>
            <h2 className="ml-4 mb-4 select-none">
              {review?.game_review_content}
            </h2>
            <h2 className="ml-4 select-none text-gray-500 text-sm mt-0.5">
              {review.updated_at.replace('T', ' ').substring(0, 16)}
            </h2>
          </span>
        </>
      )}
    </div>
  );
}

export { GameSummary, GameReviewSummary };
