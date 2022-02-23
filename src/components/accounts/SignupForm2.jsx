import { useApiAxios } from 'base/api/base';
import { ko } from 'date-fns/esm/locale';
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

function SignupForm2() {
  const Navigate = useNavigate();
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [showSubmitModal, setshowSubmitModal] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());

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
              🙏 선택 정보 입력 공간입니다!
            </h1>
            <p className="leading-relaxed mt-4 text-center select-none">
              원하시는 정보를 입력해주시면
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              회원가입이 무사히 마무리됩니다.
            </p>
            <p className="leading-relaxed mt-4 text-center select-none">
              유클리드 소프트 사내 도서관 가입을
            </p>
            <p
              className="leading-relaxed mt-4 text-center select-none hover:text-blue-500
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
            >
              진심으로 환영합니다!
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
            <div className="flex justify-end">
              <CancelIcon className="flex justify-end" onClick="#" />
            </div>
            <h2 className="flex text-gray-900 text-lg title-font mb-5 select-none font-bold">
              Selection information
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="position"
                className="leading-7 text-sm text-gray-600 select-none font-semibold"
              >
                Position
              </label>
              <div>
                <select
                  className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="position"
                  value={fieldValues.position}
                  onChange={handleFieldChange}
                >
                  <option className="hidden">직급을 선택해주세요.</option>
                  <option>사원</option>
                  <option>주임</option>
                  <option>대리</option>
                  <option>과장</option>
                  <option>차장</option>
                  <option>부장</option>
                  <option>전무</option>
                  <option>이사</option>
                  <option>대표</option>
                </select>
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="gender"
                className="leading-7 text-sm text-gray-600 select-none font-semibold"
              >
                Gender
              </label>
              <div>
                <select
                  className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="gender"
                  value={fieldValues.gender}
                  onChange={handleFieldChange}
                >
                  <option className="hidden">성별을 선택해주세요.</option>
                  <option>여성</option>
                  <option>남성</option>
                </select>
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="birthdate"
                className="leading-7 text-sm text-gray-600 select-none font-semibold"
              >
                Birth Day
              </label>
              <div>
                <input
                  type="birthdate"
                  id="birthdate"
                  name="birthdate"
                  autoComplete="birthdate"
                  value={fieldValues.birthdate}
                  onChange={handleFieldChange}
                  placeholder="생년 4자리"
                  className="w-32 text-center bg-white rounded border border-gray-3s00 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <select
                  className="w-32 text-center pt-2 pb-2 bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="birthdate"
                  value={fieldValues.position}
                  onChange={handleFieldChange}
                >
                  <option className="hidden text-center">생월 선택</option>
                  <option>1월</option>
                  <option>2월</option>
                  <option>3월</option>
                  <option>4월</option>
                  <option>5월</option>
                  <option>6월</option>
                  <option>7월</option>
                  <option>8월</option>
                  <option>9월</option>
                  <option>10월</option>
                  <option>11월</option>
                  <option>12월</option>
                </select>
                <input
                  type="birthdate"
                  id="birthdate"
                  name="birthdate"
                  autoComplete="birthdate"
                  value={fieldValues.birthdate}
                  onChange={handleFieldChange}
                  placeholder="생일 2자리"
                  className="w-32 text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="relative mb-4">
              <button
                to={`/test/`}
                onClick={handleClickCancleButton}
                className="ml-14 peer mt-6 w-1/3 bg-white rounded border border-gray-300
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
              text-base outline-none text-gray-700 py-1 px-3 leading-8 mr-0
              transition duration-500 ease-in-out hover:scale-105"
              >
                뒤로가기
              </button>
              <button
                className="peer mt-6 w-1/3 bg-indigo-500 rounded border border-gray-300
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
              text-base outline-none text-white py-1 px-3 leading-8 ml-10
              transition duration-500 ease-in-out hover:scale-105"
                onClick={handleClickSubmitButton}
              >
                회원가입
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

export default SignupForm2;
