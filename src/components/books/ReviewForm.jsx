import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  review_rate: '',
  review_content: '',
};

function ReviewForm({ reviewId, handleDidSaveReview }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: review }, refetch] = useApiAxios(
    {
      url: `books/api/review/${reviewId}/`,
      method: 'GET',
    },
    { manual: !reviewId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !reviewId ? `books/api/review/` : `books/api/review/${reviewId}/`,
      method: !reviewId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    review || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('감상평을 남기시겠습니까?')) {
      e.preventDefault();

      const formData = new FormData();
      Object.entries(fieldValues).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          const fileList = value;
          fileList.forEach((file) => formData.append(name, file));
        } else {
          formData.append(name, value);
        }
      });

      saveRequest({
        data: formData,
      }).then((response) => {
        const savedReview = response.data;
        if (handleDidSaveReview) handleDidSaveReview(savedReview);
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      <label className="leading-7 text-sm text-gray-600 select-none font-semibold">
        {auth?.username}
      </label>
      <span className="flex">
        <select
          className="w-[100px] h-[42px] text-gray-400 text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
          name="rate"
          //   value={}
          // onChange={(e) => setMonth(e.target.value)}
        >
          <option className="hidden text-center">별점</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input
          type="text"
          name="review"
          //   value={}
          // onChange={(e) => setYear(e.target.value)}
          placeholder="도서 감상평 100자 이내 등록"
          className="w-[850px] ml-4 text-center bg-white rounded border border-gray-3s00 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 ease-in-out"
        />
        <button className="w-[52px] border-2 border-gray-400 ml-4">등록</button>
      </span>
    </div>
  );
}

export default ReviewForm;
