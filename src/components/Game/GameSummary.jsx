import { Link, useLocation, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { RateIcon } from 'designMaterials/RateIcon';
import GameLoanedModal from 'components/parts/GameLoanedModal';
import LoanedIcon from 'designMaterials/LoanedIcon';

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
    <div className="px-[90px] py-[15px] lg:w-1/2">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          alt={game.game_name}
          src={game?.game_cover_photo ? game?.game_cover_photo : non_image}
          className="flex-shrink-0 w-[250px] h-[300px] object-scale-down object-center sm:mb-0 cursor-pointer
          inline-block m-auto mt-40"
          onClick={() => {
            navigate(`/game/${game.game_num}/`);
          }}
        />
        <span className="absolute inline-flex mt-96">
          {game?.game_state === 'A' ? (
            <div onClick={handleClickLoan} className="flex ml-[280px]">
              <h1 className="m-auto select-none">대여하기</h1>
              <LoanedIcon />
            </div>
          ) : (
            <div className="flex m-auto ml-[280px] select-none hover:text-indigo-700">
              <h1 className="mr-1">반납 예정 |</h1>
              {game?.loaned_game[0]?.return_due_time
                .replace('T', ' ')
                .substring(0, 16)}
            </div>
          )}
          <GameLoanedModal
            ariaHideApp={false}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            game_num={game?.game_num}
            reload={reload}
          />
        </span>

        <Link
          to={`/game/${game.game_num}/`}
          state={{ beforeLocation: location.search }}
        >
          <div className="flex-grow sm:pl-8 mt-36">
            <h3 className="text-sm text-gray-500 mb-3 select-none flex cursor-default">
              {game?.player_num && `[ ${game?.player_num} ]`}
            </h3>
            <h2
              className="absolute title-font font-medium text-lg text-black 
              cursor-pointer grid font-semibold"
              onClick={() => {
                navigate(`/game/${game.game_num}/`);
              }}
            >
              {game.game_name}
            </h2>
            <h3 className="mt-12 text-sm text-gray-500 select-none cursor-default">
              {game.level} | {game.play_time} | {game.game_amount} 개
            </h3>
            <p
              className="font-medium text-base mb-4 mt-6 select-none cursor-pointer"
              onClick={() => {
                navigate(`/game/${game.game_num}/`);
              }}
            >
              {game.game_rule
                ? truncateString(game.game_rule)
                : truncateString('')}
            </p>
          </div>
        </Link>
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
