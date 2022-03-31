import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';

import { toast, ToastContainer } from 'react-toastify';

const INITIAL_STATE = { email: '', password: '' };

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LoginForm() {
  const navigate = useNavigate();
  let query = useQuery();

  const [, , login] = useAuth();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);

  const [{}, refetch] = useApiAxios(
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
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-20 text-center text-3xl font-extrabold text-gray-900 select-none">
              로그인
            </h2>
            <h1
              className="mt-2 text-center text-sm text-gray-600"
              onClick={() => {
                navigate(`/accounts/signup/`);
              }}
            >
              <p className="font-medium text-indigo-600 hover:text-indigo-500 select-none cursor-pointer">
                {' '}
                회원가입하기{' '}
              </p>
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={fieldValues.email}
                  onChange={handleFieldChange}
                  required
                  className="appearance-none rounded-none relative block w-full h-[50px] px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="이메일주소를 입력해주세요."
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={fieldValues.password}
                  onChange={handleFieldChange}
                  required
                  className="appearance-none rounded-none relative block w-full h-[50px] px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                들어가기
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-8 pb-[65px] select-none relative text-center">
            ㈜ 유클리드소프트
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default LoginForm;
