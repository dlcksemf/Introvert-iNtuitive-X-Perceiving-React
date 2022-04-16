import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect, useState } from 'react';
import Button from './Button';
import LoadingIndicator from 'components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import FormCategory from 'components/parts/FormCategory';
import AdminApplication from 'components/maneger/AdminApplication';
import AdminRegistration from 'components/maneger/AdminRegistration';
import PageAdminRegistration from './PageAdminRegistration';

const INIT_FIELD_VALUES = {
  title: '',
  writer: '',
  translator: '',
  publisher: '',
  published_date: '',
  ISBN: '',
  story: '',
  state: 'A',
  category: '',
  amount: '1',
};

function AdminBookForm({ postId, handleDidSave, post }) {
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();
  const [showISBN, setShowISBN] = useState(true);

  const encodeFileToBase64 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const [auth] = useAuth();

  // const [{ data: post }, refetch] = useApiAxios(
  //   {
  //     url: `books/api/books/${postId}/`,
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${auth.access}`,
  //     },
  //   },
  //   {
  //     manual: !postId,
  //   },
  // );

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
  }, [post, setFieldValues]);

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('도서의 정보를 업로드 하시겠습니까?')) {
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
        const savedPost = response.data;
        if (handleDidSave) handleDidSave(savedPost);
      });
    } else {
      // navigate(-1);
    }
  };

  const handleCancleButton = (e) => {
    if (window.confirm('도서 등록을 취소하시겠습니까?')) {
      navigate('/admin/booklist/');
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      {/* <form onSubmit={handleSubmit}> */}
      <div className="text-center">
        <button
          className={`${
            showISBN ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }  border border-indigo-400 px-5 mr-2 py-2
        text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white`}
          onClick={() => setShowISBN(true)}
        >
          ISBN
        </button>

        <button
          className={`${
            !showISBN ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }
         border border-indigo-400 px-5 mr-2 py-2
        text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white
      `}
          onClick={() => setShowISBN(false)}
        >
          직접 등록
        </button>
      </div>

      <form>
        <div className="mt-20 mb-30">
          <div className="max-w-3xl mb-40 mx-auto px-20 pb-10 shadow-xl">
            <label className="font-bold mb-7 text-2xl text-gray-700 block text-center">
              도서 등록
            </label>
            {showISBN ? (
              <PageAdminRegistration />
            ) : (
              <>
                <div className="py-5">
                  <div>
                    <div
                      className="mb-3"
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <input
                        name="cover_photo"
                        style={{ display: 'none' }}
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          encodeFileToBase64(e, e.target.files[0]);
                        }}
                      />
                      <div className="font-semibold text-indigo-600 hover:text-indigo-700">
                        <label
                          for="img"
                          className="cursor-pointer 
                      "
                        >
                          📙 도서 표지 등록하기
                        </label>
                      </div>
                    </div>

                    {(imageSrc || post?.cover_photo) && (
                      <div className="preview">
                        <img
                          src={imageSrc || post?.cover_photo}
                          alt="preview-img"
                        />
                      </div>
                    )}
                  </div>

                  {saveErrorMessages.photo?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>

                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block outline-none">
                    카테고리
                  </label>
                  <select
                    name="category"
                    onChange={handleFieldChange}
                    value={fieldValues.category}
                  >
                    <FormCategory />
                  </select>
                </div>

                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block">
                    제목
                  </label>
                  <input
                    name="title"
                    value={fieldValues.title}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="도서 제목을 넣어주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.title?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block">
                    저자
                  </label>
                  <input
                    name="writer"
                    value={fieldValues.writer}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="글쓴이를 넣어주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.writer?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block">
                    역자
                  </label>
                  <input
                    name="translator"
                    value={fieldValues.translator}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="역자를 넣어주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    autoComplete="off"
                    placeholder="출판사를 넣어주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  <input
                    name="published_date"
                    value={fieldValues.published_date}
                    onChange={handleFieldChange}
                    type="date"
                    autoComplete="off"
                    placeholder="출판일을 선택해주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.published_date?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block">
                    ISBN
                  </label>
                  <input
                    name="ISBN"
                    value={fieldValues.ISBN}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="ISBN을 넣어주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.ISBN?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="font-bold mb-1 text-gray-700 block">
                    도서 수량
                  </label>
                  <input
                    name="amount"
                    value={fieldValues.amount}
                    onChange={handleFieldChange}
                    placeholder="도서 수량을 입력해주세요."
                    className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.amount?.map((message, index) => (
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
                    autoComplete="off"
                    placeholder="줄거리를 넣어주세요."
                    className="w-full h-80 bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.story?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>

                <div className="my-3 text-center">
                  <Button onClick={handleSubmit}>저장하기</Button>
                  <button
                    className="border border-gray-400 text-gray-500 font-bold py-2 px-4 mr-3 rounded hover:text-gray-700"
                    onClick={handleCancleButton}
                  >
                    <p className="">취소하기</p>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default AdminBookForm;
