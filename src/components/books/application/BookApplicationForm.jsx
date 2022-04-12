import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'base/hooks/Authcontext';
import { useState } from 'react';
import BookApplicationSearch from './BookApplicationSearch';
import { useApiAxios } from 'base/api/base';

function BookApplicationForm() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const [{ data }, refetch] = useApiAxios(
    {
      url: `/books/api/naver_api/?query=${query}`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{}, saveApplication] = useApiAxios(
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
          toast.info(`${response.data.title}(이)가 신청 되었습니다`, {
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
    <div className="h-[550px]">
      <div className="border-b-4 border-sky-600 w-3/4 relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          도서 신청 하기
        </h2>
      </div>
      <div>
        <button
          className="text-2xl font-bold relative left-[225px] top-[70px] hover:text-sky-600
          animate__animated animate__heartBeat animate__slower animate__infinite"
          onClick={Link}
        >
          ISBN 찾기
        </button>
        <div>
          <BookApplicationSearch
            handleSubmit={handleSubmit}
            setQuery={setQuery}
            className="w-full select-none"
          />

          {!data?.items[0]?.image ? (
            data?.items && (
              <h1 className="text-red-400 font-sm select-none relative left-[363px] bottom-[80px]">
                검색결과가 없습니다.
              </h1>
            )
          ) : (
            <>
              <div className="flex justify-start">
                <img
                  className="lg:w-[150px] w-[150px] lg:h-auto h-auto object-cover select-none relative top-[130px] left-[490px]"
                  src={data?.items[0].image}
                  alt=""
                />
              </div>

              <div className="w-fit">
                <p className="relative bottom-[100px] left-[710px] text-center text-xl font-bold select-none w-[390px]">
                  {data?.items[0].title}
                </p>
                <p className="relative bottom-[70px] left-[710px] text-lg text-center select-none">
                  {data?.items[0].author} | {data?.items[0].publisher}
                </p>
                <p className="text-gray-500 text-sm select-none text-center relative bottom-[40px] left-[710px]">
                  ISBN: {data?.items[0].isbn.slice(-13)}
                </p>
              </div>

              <form className="flex justify-center">
                <button
                  onClick={handleClickSubmitButton}
                  className="relative top-[20px] left-[130px] shadow-lg
                  border-dashed border-2 border-sky-600 h-[50px] w-[100px]"
                >
                  신청하기
                </button>
                <button
                  onClick={handleClickCancleButton}
                  className="relative top-[20px] left-[170px] shadow-lg
                  border-dashed border-2 border-gray-400 h-[50px] w-[100px]"
                >
                  취소
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookApplicationForm;
