import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useEffect, useState } from 'react';
import BookApplicationSearch from './BookApplicationSearch';
import { useApiAxios } from 'base/api/base';

const INIT_VALUE = {};

const DATA_FIELDS = [
  { field: 'title', placeholder: '제목' },
  { field: 'writer', placeholder: '저자' },
  { field: 'publisher', placeholder: '출판사' },
  { field: 'ISBN', placeholder: 'ISBN' },
];

function BookApplicationForm() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);
  const [query, setQuery] = useState();

  const [{ data }, refetch] = useApiAxios(
    {
      url: `/books/api/naver_api/?query=${query}`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ errorMessages }, saveApplication] = useApiAxios(
    {
      url: '/books/api/applications/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch().then((response) => {
      console.log(response.data);
    });
  };

  const handleClickSubmitButton = (e) => {
    e.preventDefault();

    window.confirm('신청하시겠습니까?') &&
      saveApplication({
        data: {
          title: data?.items[0].title,
          writer: data?.items[0].author,
          publisher: data?.items[0].publisher,
          ISBN: data?.items[0].isbn.slice(-13),
          state: 'P',
          user_id: auth.user_id,
        },
      })
        .then((response) => {
          toast.info(`💫 ${response.data.title}(이)가 신청 되었습니다`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/books/application/');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleClickCancleButton = (e) => {
    e.preventDefault();

    window.confirm('취소하시겠습니까?') && navigate(-1);
  };

  const Link = () => {
    window.open(`https://book.naver.com/`, '_blank');
  };

  return (
    <div>
      <div className="h-screen flex justify-center mt-80">
        <div className="w-1/3">
          <div className="bg-white relative rounded-lg p-4 sm:p-4 md:p-8 lg:p-12 shadow-lg border-2 border-gray-200">
            <h2 className="mb-8 text-center text-2xl text-gray-600 font-bold font-sans select-none">
              📚 도서 신청 📖
            </h2>
            <button className="mb-2 text-sm text-indigo-900" onClick={Link}>
              ISBN 찾기
            </button>
            <div>
              <BookApplicationSearch
                handleSubmit={handleSubmit}
                setQuery={setQuery}
                className="w-full"
              />

              {!data?.items[0]?.image ? (
                data?.items && (
                  <div className="text-red-400 font-sm">
                    검색결과가 없습니다.
                  </div>
                )
              ) : (
                <>
                  <div>
                    <img
                      className="w-28 mt-2"
                      src={data?.items[0].image}
                      alt=""
                    />
                  </div>
                  <form onClick={handleClickSubmitButton}>
                    <div>
                      <p className="mt-3 text-lg font-bold">
                        {data?.items[0].title}
                      </p>
                    </div>
                    <div>
                      <p>
                        {data?.items[0].author} | {data?.items[0].publisher}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        ISBN: {data?.items[0].isbn.slice(-13)}
                      </p>
                    </div>

                    <div>
                      <button
                        className="
                w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white
                tracking-wide font-semibold font-sans hover:bg-indigo-700"
                      >
                        신청하기
                      </button>

                      <button
                        onClick={handleClickCancleButton}
                        className="
                w-full mt-6 mb-3 bg-gray-300 rounded-lg px-4 py-2 text-lg text-gray-800 
                tracking-wide font-semibold font-sans hover:bg-indigo-200"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookApplicationForm;
