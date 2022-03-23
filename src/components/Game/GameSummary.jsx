import { Link, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { useApiAxios } from 'base/api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { RateIcon } from 'designMaterials/RateIcon';
import ReviewForm from 'components/books/ReviewForm';

function GameSummary({ game }) {
  return (
    <div className="m-auto px-4 py-4 max-w-xl">
      <div className="bg-gray-100 hover:bg-blue-100 border-gray-100 border-2 rounded-lg overflow-hidden mb-10">
        {game.game_cover_photo && (
          <Link to={`/game/${game.game_num}/`}>
            <img
              src={game.game_cover_photo}
              alt={game.game_name}
              className="w-full"
            />
          </Link>
        )}
        {!game?.game_cover_photo && (
          <Link to={`/game/${game.game_num}/`}>
            <img src={non_image} alt={game.game_name} className="w-full" />
          </Link>
        )}
        <div className="p-8 sm:p-9 md:p-7 xl:p-9">
          <h3 className="font-semibold text-dark text-center">
            <Link to={`/game/${game.game_num}/`}>{game.game_name}</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

function GameReviewSummary({ review, setReload }) {
  const [auth] = useAuth();
  // const { book_num } = useParams();
  const [, setReviewDelete] = useState(false);
  const [input, setInput] = useState('');
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const timeStamp = () => {
    const today = new Date(review.updated_at);
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace('T', ' ').substring(0, 16);
  };

  const [
    { loading: deleteLoading, error: deleteError },
    deleteReview,
    refetch,
  ] = useApiAxios(
    {
      url: `/game/api/game/${review?.review_num}/`,
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
      alert('삭제되었습니다.');
      deleteReview().then(() => {
        setReload((prev) => !prev);
      });
    } else {
      handleCancleButton();
      alert('취소되었습니다.');
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

  const handleClick = () => {
    setInput(review.review_rate, review.review_content);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  console.log(review.updated_at);

  return (
    <div>
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {review && (
        <>
          <span className="flex justify-end">
            {auth?.username === review?.user_id && (
              <div className="mr-2 mt-4">
                <button
                  onClick={handleClick}
                  className="inline-flex border-2 border-blue-500 text-black hover:text-blue-600 rounded-full h-6 px-3 justify-center items-center"
                >
                  수정
                </button>
                <button
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="inline-flex ml-1 border-2 border-pink-500 text-black hover:text-pink-600 rounded-full h-6 px-3 justify-center items-center"
                >
                  삭제
                </button>
              </div>
            )}
          </span>
          <span className="flex mt-3">
            <h2 className="mr-4 ml-4 select-none">
              <RateIcon review_rate={review.review_rate} />
            </h2>
            <h1 className="font-extrabold select-none">{review?.user_id}</h1>
            <h2 className="ml-4 mb-4 select-none">{review?.review_content}</h2>
            <h2 className="ml-4 select-none text-gray-500 text-sm mt-0.5">
              {timeStamp(review.updated_at)}
            </h2>
          </span>
          <div className="mb-4 pl-0.5 pr-0.5">
            {input ? (
              <ReviewForm value={review.review_id} onChange={handleChange} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export { GameSummary, GameReviewSummary };
