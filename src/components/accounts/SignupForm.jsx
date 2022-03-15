import { useApiAxios } from 'base/api/base';
import useFieldValues from 'base/hooks/useFieldValues';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from 'designMaterials/CancelIcon';
import {
  SignupFormComponent1,
  SignupFormComponent2,
} from './SignupFormComponent';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import back from 'components/parts/image/back.png';
import DebugStates from 'base/DebugStates';

const INIT_FILED_VALUES = {
  username: '',
  email: '',
  phone_num: '',
  position: '',
  gender: '',
  password: '',
  password2: '',
  department: '',
};

function SignupForm() {
  const Navigate = useNavigate();
  let location = useLocation();

  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FILED_VALUES);

  const [{ errorMessages }, signup] = useApiAxios(
    {
      url: 'accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    window.confirm('😶‍🌫️ 회원가입 하시겠습니까?') &&
      signup({ data: fieldValues }).then((response) => {
        Navigate('/accounts/login/?next=/');
        toast.success(
          `🙋‍♀️ ${response.data.username}님 환영합니다 로그인 해주세요`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
      });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-16 mx-auto flex flex-wrap items-center">
        {location.pathname === '/accounts/signup/2/' ? (
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1
              className="title-font font-medium text-3xl text-gray-900 text-center select-none
          transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
            >
              🖐🏻 회원가입 화면입니다!
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              선택정보를 입력해주시면
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              선택정보를 활용한 도서통계를 통해
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              추천도서 서비스를 이용하실 수 있습니다.
            </p>
            <p
              className="leading-relaxed mt-4 text-center text-lg text-red-600 font-semibold 
          select-none underline decoration-wavy underline-offset-8"
            >
              선택정보를 입력하지 않아도 회원가입을 하실 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1
              className="title-font font-medium text-3xl text-gray-900 text-center select-none
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
            >
              🖐🏻 회원가입 화면입니다!
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              필수정보를 입력 후 가입 하시면
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              약 400여 권의 도서를 통해
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              폭 넓은 지식을 쌓으실 수 있습니다!
            </p>
          </div>
        )}

        <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
          {location.pathname === '/accounts/signup/2/' ? (
            <div className="flex justify-end">
              <NavLink to="/accounts/signup/">
                <img
                  src={back}
                  alt="뒤로가기"
                  className="flex justify-end w-[42px] h-[42px] fill-white mr-1 mt-1 transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-100"
                />
              </NavLink>
              <NavLink to="/">
                <CancelIcon className="flex justify-end" />
              </NavLink>
            </div>
          ) : (
            <div className="flex justify-end">
              <NavLink to="/">
                <CancelIcon className="flex justify-end" />
              </NavLink>{' '}
            </div>
          )}
          <h2 className="flex text-gray-900 text-lg font-bold title-font mb-5 select-none">
            회원가입 페이지
          </h2>
          {/* <DebugStates fieldValues={fieldValues} /> */}

          <form onSubmit={handleClickSubmitButton}>
            <Routes>
              <Route
                path="/"
                element={
                  <SignupFormComponent1
                    fieldValues={fieldValues}
                    handleFieldChange={handleFieldChange}
                    errorMessages={errorMessages}
                  />
                }
              />
              <Route
                path="/2/"
                element={
                  <SignupFormComponent2
                    fieldValues={fieldValues}
                    handleFieldChange={handleFieldChange}
                    // handleSubmit={handleSubmit}
                    setFieldValues={setFieldValues}
                  />
                }
              />
            </Routes>

            {/* 첫 회원가입 화면에서 다음으로 누를 때 필수항목이 다 채워지지 않으면 넘어가지 않게 해주세요.....
            지금은 그냥 다음으로 눌러도 넘어가집니당.... */}
            <div className="relative mb-4">
              {location.pathname === '/accounts/signup/2/' ? (
                <button
                  className="mt-6 w-full bg-indigo-600 border border-gray-300
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
              text-base outline-none text-white py-2 px-3 leading-8 hover:bg-indigo-700
              transition duration-500 ease-in-out hover:scale-105 rounded-full"
                  onClick={handleClickSubmitButton}
                >
                  회원가입
                </button>
              ) : (
                <NavLink
                  className="text-white bg-indigo-500 border-0 py-2 px-8 
                focus:outline-none hover:bg-indigo-600 rounded-full text-lg
              transition duration-500 ease-in-out hover:scale-105 w-full text-center"
                  type="button"
                  to="/accounts/signup/2/"
                >
                  다음으로
                </NavLink>
              )}
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-3 select-none">
            ㈜ 유클리드소프트
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignupForm;
