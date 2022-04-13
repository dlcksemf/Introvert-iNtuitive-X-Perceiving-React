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
    { loading: saveLoading, errorMessages: saveErrorMessages },
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
      <form onSubmit={handleSubmit}>
        <span className="flex justify-center">
          <div className="text-4xl relative top-[5px] select-none">
            <StarRatingComponent
              name="review_rate"
              starCount={5}
              value={value}
              onStarClick={onStarClick}
              emptyStarColor="#C0C0C0"
            />
          </div>
          <input
            type="text"
            name="review_content"
            value={fieldValues.review_content}
            onChange={handleFieldChange}
            placeholder="도서 감상평 100자 이내 등록"
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
      {saveErrorMessages.review_rate?.map((message, index) => (
        <div className="text-xs text-red-400 relative left-[62px] top-[25px]">
          <p key={index}>{message}</p>
        </div>
      ))}
      {saveErrorMessages.review_content?.map((message, index) => (
        <div className="text-xs text-red-400 text-center relative left-[75px] top-[10px]">
          <p key={index}>{message}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewForm;
