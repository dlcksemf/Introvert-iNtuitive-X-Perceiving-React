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

    auth.isLoggedIn
      ? saveRequest({
          data: { ...fieldValues, user_id: auth.user_id, game_name: game },
        }).then(() => {
          setReload((prev) => !prev);
          setValue(0);
          emptyFieldValues();
        })
      : window.confirm('로그인 후 이용해주세요') &&
        navigate('/accounts/login/');
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
        <span className="flex justify-center">
          <div className="text-4xl relative top-[5px] select-none">
            <StarRatingComponent
              name="game_review_rate"
              starCount={5}
              value={value}
              onStarClick={onStarClick}
              emptyStarColor="#C0C0C0"
            />
          </div>
          <input
            type="text"
            name="game_review_content"
            value={fieldValues.game_review_content}
            onChange={handleFieldChange}
            placeholder="게임 이용 후기 100자 이내 등록"
            className="w-[770px] h-[48px] relative top-[3px] left-[10px] text-center rounded-md border-2 
            border-gray-400 font-bold focus:border-sky-600 focus:ring-2 focus:ring-indigo-200 
            outline-none text-gray-600 transition-colors duration-200 ease-in-out"
            autoComplete="off"
          />
          <button
            className="w-[50px] h-[50px] rounded-md border-4 border-double hover:border-sky-500 
          border-gray-400 relative left-[25px]"
          >
            등록
          </button>
        </span>
      </form>
      {saveErrorMessages.game_review_rate?.map((message, index) => (
        <div className="text-xs text-red-400 relative left-[62px] top-[25px]">
          <p key={index}>{message}</p>
        </div>
      ))}
      {saveErrorMessages.game_review_content?.map((message, index) => (
        <div className="text-xs text-red-400 text-center relative left-[75px] top-[10px]">
          <p key={index}>{message}</p>
        </div>
      ))}
    </div>
  );
}

export default GameReviewForm;
