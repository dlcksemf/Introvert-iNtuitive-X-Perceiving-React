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
  const [showISBN, setShowISBN] = useState(false);

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

    if (window.confirm('????????? ????????? ????????? ???????????????????')) {
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
    if (window.confirm('?????? ????????? ?????????????????????????')) {
      navigate('/admin/booklist/');
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>?????? ???..</LoadingIndicator>}
      {saveError &&
        `?????? ??? ????????? ?????????????????? (${saveError.response?.status} ${saveError.response?.statusText})`}
      {/* <form onSubmit={handleSubmit}> */}
      {/* <div className="text-center">
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
          ?????? ??????
        </button>
      </div> */}

      <form>
        <div className="mt-20 mb-30">
          <div className="max-w-3xl mb-40 mx-auto px-20 pb-10 shadow-xl">
            <label className="font-bold mb-7 text-2xl text-gray-700 block text-center">
              ?????? ??????
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
                          ???? ?????? ?????? ????????????
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
                    ????????????
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
                    ??????
                  </label>
                  <input
                    name="title"
                    value={fieldValues.title}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="?????? ????????? ???????????????."
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
                    ??????
                  </label>
                  <input
                    name="writer"
                    value={fieldValues.writer}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="???????????? ???????????????."
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
                    ??????
                  </label>
                  <input
                    name="translator"
                    value={fieldValues.translator}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="????????? ???????????????."
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
                    ?????????
                  </label>
                  <input
                    name="publisher"
                    value={fieldValues.publisher}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="???????????? ???????????????."
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
                    ?????????
                  </label>
                  <input
                    name="published_date"
                    value={fieldValues.published_date}
                    onChange={handleFieldChange}
                    type="date"
                    autoComplete="off"
                    placeholder="???????????? ??????????????????."
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
                    placeholder="ISBN??? ???????????????."
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
                    ?????? ??????
                  </label>
                  <input
                    name="amount"
                    value={fieldValues.amount}
                    onChange={handleFieldChange}
                    placeholder="?????? ????????? ??????????????????."
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
                    ?????????
                  </label>
                  <textarea
                    name="story"
                    value={fieldValues.story}
                    onChange={handleFieldChange}
                    type="text"
                    autoComplete="off"
                    placeholder="???????????? ???????????????."
                    className="w-full h-80 bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {saveErrorMessages.story?.map((message, index) => (
                    <p key={index} className="text-xs text-red-400">
                      {message}
                    </p>
                  ))}
                </div>

                <div className="my-3 text-center">
                  <Button onClick={handleSubmit}>????????????</Button>
                  <button
                    className="border border-gray-400 text-gray-500 font-bold py-2 px-4 mr-3 rounded hover:text-gray-700"
                    onClick={handleCancleButton}
                  >
                    <p className="">????????????</p>
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
