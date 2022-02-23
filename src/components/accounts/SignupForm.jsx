import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import CancelIcon from 'designMaterials/CancelIcon';

const INIT_FILED_VALUES = {
  username: '',
  email: '',
  phone_num: '',
  position: '',
  gender: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const Navigate = useNavigate();
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [showSubmitModal, setshowSubmitModal] = useState(false);

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FILED_VALUES);

  const [{ error, errorMessages }, signup] = useApiAxios(
    {
      url: 'accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ data: fieldValues }).then(() => {
      Navigate('/accounts/login/?next=/');
    });
  };

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    setshowSubmitModal(true);
  };

  const handleClickCancleButton = (e) => {
    e.preventDefault();
    setShowCancleModal(true);
  };

  const handleCancleButton = () => {
    if (showSubmitModal) {
      setshowSubmitModal(false);
    } else if (showCancleModal) {
      setShowCancleModal(false);
    }
  };

  const handleOkButton = () => {
    if (showSubmitModal) {
      handleSubmit();
    } else if (showCancleModal) {
      Navigate('/test/');
    }
  };

  return (
    <section className="text-gray-600 body-font">
      {error &&
        `가입에 실패하였습니다. (${error.response?.status} ${error.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <div className="container px-5 py-36 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1
              className="title-font font-medium text-3xl text-gray-900 text-center select-none
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
            >
              🖐🏻 안녕하세요, 반가워요!
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              회원가입을 하시면
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              약 400여 권의 도서를 통해
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              폭 넓은 지식을 쌓으실 수 있습니다!
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
            <div className="flex justify-end">
              <CancelIcon className="flex justify-end" onClick="#" />
            </div>
            <h2 className="flex text-gray-900 text-lg font-bold title-font mb-5 select-none">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                type="username"
                id="username"
                name="username"
                autoComplete="username"
                value={fieldValues.username}
                onChange={handleFieldChange}
                placeholder="이름을 입력해 주세요."
                className="peer w-full bg-white rounded border border-gray-300 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out hover:font-bold"
              />
              {errorMessages.username?.map((message, index) => (
                <p
                  key={index}
                  className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
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
                placeholder="이메일을 입력해주세요."
                className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errorMessages.email?.map((message, index) => (
                <p
                  key={index}
                  className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="phone_num"
                className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="phone_num"
                id="phone_num"
                name="phone_num"
                autoComplete="phone_num"
                value={fieldValues.phone_num}
                onChange={handleFieldChange}
                placeholder="휴대전화 번호를 입력해주세요."
                className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errorMessages.phone_num?.map((message, index) => (
                <p
                  key={index}
                  className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
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
                placeholder="비밀번호를 설정해주세요."
                className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errorMessages.password?.map((message, index) => (
                <p
                  key={index}
                  className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password2"
                className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
              >
                Re-enter password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                autoComplete="password2"
                value={fieldValues.password2}
                onChange={handleFieldChange}
                placeholder="비밀번호를 재확인해주세요."
                className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errorMessages.non_field_errors?.map((message, index) => (
                <p
                  key={index}
                  className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
            <div className="relative mb-4">
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 
                focus:outline-none hover:bg-indigo-600 rounded text-lg
              transition duration-500 ease-in-out hover:scale-105 w-full"
                onClick={() => {
                  Navigate(`/accounts/signup/2/`);
                }}
              >
                다음으로
              </button>
            </div>

            {(showSubmitModal || showCancleModal) && (
              <ConfirmationModal
                handleOkButton={handleOkButton}
                handleCancleButton={handleCancleButton}
              >
                {showSubmitModal
                  ? '회원가입 하시겠습니까?'
                  : '취소하시겠습니까?'}
              </ConfirmationModal>
            )}
            <p className="text-xs text-gray-500 mt-3 select-none">
              (주) 유클리드 소프트
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
