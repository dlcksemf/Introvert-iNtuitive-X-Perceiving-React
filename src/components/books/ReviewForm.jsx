import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';

const INIT_FIELD_VALUES = {
  review_rate: '',
  review_content: '',
};

function ReviewForm({ reviewId, book, setReload }) {
  const [auth] = useAuth();

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

  const { fieldValues, handleFieldChange, emptyFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('감상평을 남기시겠습니까?')) {
      e.preventDefault();

      saveRequest({
        data: { ...fieldValues, user_id: auth.user_id, book_name: book },
      }).then(() => {
        setReload((prev) => !prev);
        emptyFieldValues();
      });
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <span className="flex">
          <select
            className="w-[100px] outline-none h-[42px] text-gray-400 text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
            name="review_rate"
            value={fieldValues.review_rate}
            onChange={handleFieldChange}
          >
            <option className="hidden text-center">별점</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
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
            className="w-[850px] ml-4 text-center bg-white rounded border border-gray-300 
            hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
            text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 
            ease-in-out outline-none"
            autoComplete="off"
          />
          {saveErrorMessages.review_content?.map((message, index) => (
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

export default ReviewForm;
