import { useApiAxios } from 'base/api/base';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate, useLocation } from 'react-router-dom';
import SignupFormComponent from './SignupFormComponent';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    window.confirm('회원가입 하시겠습니까?') &&
      signup({ data: fieldValues })
        .then((response) => {
          Navigate('/accounts/login/?next=/');
          toast.success(
            `${response.data.username}님 환영합니다. 로그인 해주세요`,
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
        })
        .catch((error) => {
          error &&
            window.confirm(
              '회원가입을 하실 수 없습니다. 기입된 정보를 확인해주세요.',
            );
        });
  };
  return (
    <section className="text-black body-font select-none relative ">
      <h1 className="text-2xl font-bold text-center relative top-[50px]">
        회원가입
      </h1>
      <div className="relative left-[290px] top-[190px]">
        <h1 className="text-center select-none">
          ◎ 선택정보를 입력해주시면 추천도서 서비스를 이용하실 수 있습니다.
        </h1>
        <h1
          className="text-center text-lg text-red-600 font-semibold 
          select-none underline decoration-wavy underline-offset-8"
        >
          선택정보를 입력하지 않아도 회원가입을 하실 수 있습니다.
        </h1>
        <h1 className="text-xs absolute left-[710px] top-[80px]">
          ㈜ 유클리드소프트
        </h1>
      </div>
      <div className="relative left-[700px] bottom-[150px]">
        <SignupFormComponent
          fieldValues={fieldValues}
          handleFieldChange={handleFieldChange}
          setFieldValues={setFieldValues}
          errorMessages={errorMessages}
        />
      </div>
      <div className="relative bottom-[265px] left-[790px]">
        <button
          onClick={handleClickSubmitButton}
          className="relative top-[20px] left-[130px] rounded
                  border bg-indigo-600 h-[50px] w-[100px] font-bold text-white"
        >
          가입하기
        </button>
        <NavLink to="/">
          <button
            className="relative top-[20px] left-[170px] rounded
                  border bg-gray-300 h-[50px] w-[100px] font-bold"
          >
            취소하기
          </button>
        </NavLink>
      </div>
    </section>
  );
}
export default SignupForm;
