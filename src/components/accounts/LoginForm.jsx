import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';

import { toast, ToastContainer } from 'react-toastify';
import CancelIcon from 'designMaterials/CancelIcon';
import { useMediaQuery } from 'react-responsive';

const INITIAL_STATE = { email: '', password: '' };

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LoginForm() {
  const navigate = useNavigate();
  let query = useQuery();
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const [, , login] = useAuth();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);

  const [{ error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues })
      .then((response) => {
        const { access, refresh, user_id, is_staff, username, birthdate } =
          response.data;
        console.log(response.data);
        login({
          access,
          refresh,
          user_id,
          is_staff,
          username,
          birthdate,
        });

        if (is_staff || query.get('next') === '/') {
          navigate('/');
        } else {
          navigate(-1);
        }
      })
      .catch(() => {
        toast.error('😶 이메일 / 비밀번호를 확인해주세요', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <section className="text-gray-600 body-font">
      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}
      {isPc && (
        <div className="container px-5 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900 text-center select-none">
              📖 로그인 화면 입니다.
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              도서를 대출 하고 싶으신가요?
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              도서를 신청 하고 싶으신가요?
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              로그인 후 이용하실 수 있습니다.
            </p>
            <h1
              className="leading-relaxed mt-4 text-xl font-semibold text-center select-none text-blue-700 cursor-pointer
            hover:text-blue-500 transition duration-500 ease-in-out hover:scale-125 hover:font-extrabold
            underline decoration-wavy underline-offset-8"
              onClick={() => {
                navigate(`/accounts/signup/`);
              }}
            >
              회원가입하기
            </h1>
          </div>
          <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
            <div className="flex justify-end">
              <div
                className="flex justify-end"
                onClick={() => {
                  navigate('/');
                }}
              >
                <CancelIcon />
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 text-lg font-bold title-font mb-5 select-none">
                로그인
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 select-none font-semibold"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={fieldValues.email}
                    onChange={handleFieldChange}
                    placeholder="이메일 주소를 입력해주세요."
                    className="peer w-full bg-white rounded border border-gray-300 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                text-base outline-none text-gray-700 py-1 px-3 leading-8 
                transition-colors duration-200 ease-in-out hover:font-bold"
                  />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    올바른 이메일 형식을 지켜주세요.
                  </p>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600 select-none font-semibold"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={fieldValues.password}
                    onChange={handleFieldChange}
                    placeholder="비밀번호를 입력해주세요."
                    className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    비밀번호는 8자리 이상 입력해주세요.
                  </p>
                </div>
                <button
                  type="submit"
                  className="text-white bg-indigo-600 border-0 py-3 px-8 w-full 
              focus:outline-none hover:bg-indigo-600 rounded text-lg hover:bg-indigo-700
              transition duration-500 ease-in-out hover:scale-105 rounded-full"
                >
                  들어가기
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-8 select-none">
                ㈜ 유클리드소프트
              </p>
            </div>
          </div>
        </div>
      )}
      {isTablet && 'ddd'}
      {isMobile && 'fff'}
      <ToastContainer />
    </section>
  );
}

export default LoginForm;
