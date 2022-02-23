import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const INITIAL_STATE = { email: '', password: '' };

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LoginForm() {
  const Navigate = useNavigate();
  let query = useQuery();

  const [auth, , login] = useAuth();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);

  const [{ loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues }).then((response) => {
      const { access, refresh, user_id, is_staff, username } = response.data;
      login({
        access,
        refresh,
        user_id,
        is_staff,
        username,
      });

      if (is_staff || query.get('next') === '/') {
        Navigate('/');
      } else {
        Navigate(-1);
      }
    });
  };

  return (
    <section className="text-gray-600 body-font">
      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="container px-5 py-36 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1
              className="title-font font-medium text-3xl text-gray-900 text-center select-none
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
            >
              📖 로그인 화면 입니다.
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              도서를 대출 하고 싶으신가요?
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              도서를 신청 하고 싶으신가요?
            </p>
            <p
              className="leading-relaxed mt-4 text-center select-none hover:text-blue-500
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
            >
              로그인 후 이용하실 수 있습니다.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-bold title-font mb-5 select-none">
              Log In
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 select-none font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
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
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="password"
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
              className="text-white bg-indigo-500 border-0 py-2 px-8 
              focus:outline-none hover:bg-indigo-600 rounded text-lg
              transition duration-500 ease-in-out hover:scale-105"
            >
              로그인
            </button>
            <p className="text-xs text-gray-500 mt-3 select-none">
              (주) 유클리드 소프트
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
