import { useApiAxios } from 'base/api/base';
// import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect, useState } from 'react';
import Button from './Button';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import LoadingIndicator from 'components/LoadingIndicator';

const INIT_FIELD_VALUES = {
  title: '',
  writer: '',
  translator: '',
  publisher: '',
  published_date: '',
  ISBN: '',
  story: '',
  state: 'A',
};

function ArticleForm({ postId, handleDidSave }) {
  const [fileImage, setFileImage] = useState('');

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // const MyDatePicker = styled(DatePicker)`
  //   width: 90%;
  //   height: 3rem;
  //   font-size: 1.6rem;
  //   font-weight: bold;
  //   background-color: transparent;
  //   color: white;
  //   border: 1px solid;
  // `;

  const [auth] = useAuth();

  const [{ data: post, loading: getLoading, error: getError }, refetch] =
    useApiAxios(
      {
        url: `books/api/books/${postId}/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      {
        manual: !postId,
      },
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
      url: !postId ? '/books/api/books/' : `/books/api/books/${postId}/`,
      method: !postId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    post || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.cover_photo = '';
      }),
    );
  }, [post]);

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = (e) => {
    window.confirm('도서의 정보를 업로드 하시겠습니까?');

    e.preventDefault();
    console.log('성공');

    // fieldValues: 객체(파일을 제외한)
    // 파일을 업로드 하려면, FormData 인스턴스를 써야합니다
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
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <div className="h-screen">
          <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="py-10">
              <label className="font-bold mb-2 text-gray-700 block">
                도서 표지
              </label>

              <div>
                {fileImage && (
                  <img
                    alt="sample"
                    src={fileImage}
                    style={{ margin: 'auto' }}
                  />
                )}
                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <input
                    style={{ display: 'none' }}
                    id="img"
                    name="cover_photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="hover:text-blue-400">
                  <label for="img" className="cursor-pointer">
                    도서 표지 등록하기
                  </label>
                </div>
              </div>

              {saveErrorMessages.photo?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">제목</label>
              <input
                name="title"
                value={fieldValues.title}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.title?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">저자</label>
              <input
                name="writer"
                value={fieldValues.writer}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.writer?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">역자</label>
              <input
                name="translator"
                value={fieldValues.translator}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.translator?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                출판사
              </label>
              <input
                name="publisher"
                value={fieldValues.publisher}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.publisher?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                출판일
              </label>
              {/* <div className="calender-container">
                <div className="calender-box">
                  <div className="date">시작날짜</div>
                  <div>
                    <DatePicker
                      dateFormat="yyyy-MM-dd" // 날짜 형식
                      value={fieldValues.published_date}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div> */}
              <input
                name="published_date"
                value={fieldValues.published_date}
                onChange={handleFieldChange}
                type="date"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.published_date?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">ISBN</label>
              <input
                name="ISBN"
                value={fieldValues.ISBN}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full outline-none"
              />
              {saveErrorMessages.ISBN?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="my-3">
              <label className="font-bold mb-1 text-gray-700 block">
                줄거리
              </label>
              <textarea
                name="story"
                value={fieldValues.story}
                onChange={handleFieldChange}
                type="text"
                className="p-1 bg-gray-100 w-full h-80 outline-none"
              />
              {saveErrorMessages.story?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            {/* <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                도서 상태
              </label>
              <select
                name="state"
                onChange={handleFieldChange}
                value={fieldValues.state}
              >
                <option>A</option>
                <option>B</option>
                <option>D</option>
              </select>
            </div> */}

            <div className="my-3">
              <Button>저장하기</Button>
            </div>
          </div>
        </div>
      </form>
      {/* <DebugStates
        post={post}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      /> */}
    </div>
  );
}
export default ArticleForm;
