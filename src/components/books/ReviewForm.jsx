import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

const INIT_FIELD_VALUES = {
  review_rate: '',
  review_content: '',
};

function ReviewForm({ reviewId, book, setReload }) {
  const [auth] = useAuth();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const [{}, refetch] = useApiAxios(`/books/api/review/`, { manual: true });

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !reviewId ? `/books/api/review/` : `/books/api/review/${reviewId}/`,
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
          data: {
            ...fieldValues,
            user_id: auth.user_id,
            book_name: book,
          },
        }).then(() => {
          emptyFieldValues();
          setValue(0);
          setReload((prev) => !prev);
        })
      : window.confirm('로그인 후 이용해주세요🎈') &&
        navigate('/accounts/login/');
  };

  const onStarClick = (nextValue) => {
    setValue(nextValue);
  };

  useEffect(() => {
    setFieldValues((prev) => {
      return { ...prev, review_rate: value };
    });
  }, [value]);

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      <form onSubmit={handleSubmit} className="relative top-full">
        <span className="flex justify-center mt-8 relative left-[39px] ">
          <div className="text-4xl select-none">
            <StarRatingComponent
              name="review_rate"
              starCount={5}
              value={value}
              onStarClick={onStarClick}
              emptyStarColor="#C0C0C0"
            />
          </div>
          {saveErrorMessages.review_rate?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
          <input
            type="text"
            name="review_content"
            value={fieldValues.review_content}
            onChange={handleFieldChange}
            placeholder="도서 감상평 100자 이내 등록"
            className="w-[770px] mt-0.5 ml-4 text-center bg-white rounded border border-gray-300 
            hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
            text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 
            ease-in-out"
            autoComplete="off"
          />
          {saveErrorMessages.review_content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
          <button className="w-[52px] border rounded-md hover:text-indigo-500 border-gray-400 ml-4">
            등록
          </button>
        </span>
      </form>
    </div>
  );
}

export default ReviewForm;
