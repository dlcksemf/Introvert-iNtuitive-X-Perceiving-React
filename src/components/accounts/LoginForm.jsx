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
            <h1 className="title-font font-medium text-3xl text-gray-900 text-center">
              📖 로그인 화면 입니다.
            </h1>
            <p className="leading-relaxed mt-4 text-center">
              도서를 대출 하고 싶으신가요?
            </p>
            <p className="leading-relaxed mt-4 text-center">
              도서를 신청 하고 싶으신가요?
            </p>
            <p className="leading-relaxed mt-4 text-center">
              로그인 후 이용하실 수 있습니다.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Log In
            </h2>
            <div className="relative mb-4">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                value={fieldValues.email}
                onChange={handleFieldChange}
                placeholder="이메일 주소를 입력해주세요."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="password"
                value={fieldValues.password}
                onChange={handleFieldChange}
                placeholder="비밀번호를 입력해주세요."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              로그인
            </button>
            <p className="text-xs text-gray-500 mt-3">(주) 유클리드 소프트</p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
