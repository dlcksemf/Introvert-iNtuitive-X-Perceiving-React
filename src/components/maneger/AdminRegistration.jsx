import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'base/hooks/Authcontext';

import { useApiAxios } from 'base/api/base';
import BookApplicationSearch from 'components/books/application/BookApplicationSearch';

import useFieldValues from 'base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect, useState } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import FormCategory from 'components/parts/FormCategory';
import DebugStates from 'base/DebugStates';

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
  cover_photo: '',
};

const LIST = {
  title: 'title',
  author: 'writer',
  publisher: 'publisher',
  isbn: 'ISBN',
  description: 'story',
  pubdate: 'published_date',
};

function AdminRegistration({ postId, handleDidSave }) {
  const [imageSrc, setImageSrc] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [abc, setAbc] = useState(INIT_FIELD_VALUES);
  const [category, setCategory] = useState('');

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

  const [{ data }, refetch] = useApiAxios(
    {
      url: `/books/api/naver_api/?query=${query}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    data?.items[0]?.image &&
      Object.keys(LIST).map((item, index) =>
        setAbc((prev) => {
          return {
            ...prev,
            [Object.values(LIST)[index]]:
              item === 'isbn'
                ? data?.items[0][item].slice(-13)
                : item === 'pubdate'
                ? `${data?.items[0][item].slice(0, 4)}-${data?.items[0][
                    item
                  ].slice(4, 6)}-${data?.items[0][item].slice(-2)}`
                : item === 'description'
                ? data?.items[0][item].split('&#x0D;').join(`\n`)
                : data?.items[0][item],
          };
        }),
      );
  }, [data]);

  useEffect(() => {
    setAbc((prev) => {
      return {
        ...prev,
        category: category,
      };
    });
  }, [category]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

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
    data || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.cover_photo = '';
      }),
    );
  }, [data, setFieldValues]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch().then((response) => {
      console.log(response.data);
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (window.confirm('도서의 정보를 업로드 하시겠습니까?')) {
      e.preventDefault();
      console.log(abc);

      const formData = new FormData();
      Object.entries(abc).forEach(([name, value]) => {
        console.log(name);
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
        navigate('/admin/booklist/');
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
      <div>
        {/*검색창*/}
        <div>
          <form className="text-center" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder={'ISBN을 입력해주세요'}
              autoComplete="off"
              className="py-2 mr-2 border border-gray-300 px-3 text-sm
                        w-80 relative focus:outline-none select-none"
            />

            <button
              className="rounded border border-gray-300 "
              onClick={handleSubmit}
            >
              <h1 className="py-2 px-2 text-sm text-center select-none">
                검색
              </h1>
            </button>
          </form>
        </div>

        {!data?.items[0]?.image ? (
          data?.items && (
            <h1 className="ml-32 mb-10 mt-2 text-red-400 text-sm select-none relative">
              검색결과가 없습니다.
            </h1>
          )
        ) : (
          <>
            <div className="mt-12 preview flex flex-row justify-center">
              <img
                src={imageSrc || data?.items[0].image}
                alt="preview-img"
                className="w-32 object-cover select-none relative "
              />
            </div>
            {/* <DebugStates fieldValues={fieldValues} abc={abc} /> */}

            <div className="w-fit">
              <p
                name="title"
                value={data?.items[0].title}
                onChange={handleFieldChange}
                className="mt-3 mb-5 text-center text-2xl font-bold "
              >
                {data?.items[0].title}
              </p>
              <p
                name="writer"
                value={data?.items[0].author}
                onChange={handleFieldChange}
                className="text-center text-lg"
              >
                {data?.items[0].author}
              </p>
              <p
                name="publisher"
                value={data?.items[0].publisher}
                onChange={handleFieldChange}
                className="text-center text-lg "
              >
                {data?.items[0].publisher}
              </p>
              <p
                name="ISBN"
                value={data?.items[0].isbn.slice(-13)}
                onChange={handleFieldChange}
                className="mb-5 text-gray-500 text-md text-center"
              >
                ISBN: {data?.items[0].isbn.slice(-13)}
              </p>
              <p
                name="story"
                value={data?.items[0].description}
                onChange={handleFieldChange}
                className="relative  text-lg text-center select-none"
              >
                {data?.items[0].description.split('&#x0D;').join(`\n`)}
              </p>
            </div>
            <div className="text-center">
              <label className="font-bold text-lg text-indigo-500 mt-5 block outline-none">
                카테고리 선택
              </label>
              <select
                className="border px-3 py-2 my-2 rounded border-gray-400"
                name="category"
                onChange={handleChange}
                value={category}
              >
                <FormCategory />
              </select>
            </div>

            <form className="text-right mb-5 pb-7">
              <button
                onClick={handleSubmit2}
                className="relative rounded-lg px-4 py-2 mr-2 
                  border bg-indigo-600 font-bold text-white"
              >
                저장하기
              </button>
              <button
                onClick={handleCancleButton}
                className="relative rounded-lg px-4 py-2
                  border bg-gray-300 font-bold"
              >
                취소
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminRegistration;
