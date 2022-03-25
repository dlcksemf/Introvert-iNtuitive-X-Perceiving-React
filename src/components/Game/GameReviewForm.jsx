import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

const INIT_FIELD_VALUES = {
  game_review_rate: '',
  game_review_content: '',
};

function GameReviewForm({ reviewId, game, setReload }) {
  const [auth] = useAuth();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const [{}, refetch] = useApiAxios(`/game/api/gamereview/`, { manual: true });

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !reviewId
        ? `/game/api/gamereview/`
        : `/game/api/gamereview/${reviewId}/`,
      method: !reviewId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, setFieldValues, handleFieldChange, emptyFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('게임평가를 남기시겠습니까?')) {
      e.preventDefault();

      auth.isLoggedIn
        ? saveRequest({
            data: { ...fieldValues, user_id: auth.user_id, game_name: game },
          }).then(() => {
            setReload((prev) => !prev);
            emptyFieldValues();
          })
        : window.confirm('로그인 후 이용해주세요🎈') &&
          navigate('/accounts/login/');
    }
  };

  const onStarClick = (nextValue) => {
    setValue(nextValue);
  };

  useEffect(() => {
    setFieldValues((prev) => {
      return { ...prev, game_review_rate: value };
    });
  }, [value]);

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <span className="flex">
          <div className="text-4xl select-none">
            <StarRatingComponent
              name="game_review_rate"
              starCount={5}
              value={value}
              onStarClick={onStarClick}
              emptyStarColor="#C0C0C0"
            />
          </div>
          {saveErrorMessages.game_review_rate?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
          <input
            type="text"
            name="game_review_content"
            value={fieldValues.game_review_content}
            onChange={handleFieldChange}
            placeholder="게임 이용 후기 100자 이내 등록"
            className="w-[770px] mt-0.5 ml-4 text-center bg-white rounded border border-gray-300 
            hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
            text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 
            ease-in-out outline-none"
            autoComplete="off"
          />
          {saveErrorMessages.game_review_content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
          <button className="w-[52px] border-2 border-gray-400 ml-4">
            등록
          </button>
        </span>
      </form>
    </div>
  );
}

export default GameReviewForm;
