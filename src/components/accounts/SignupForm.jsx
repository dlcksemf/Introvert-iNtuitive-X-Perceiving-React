import { useApiAxios } from 'base/api/base';
import useFieldValues from 'base/hooks/useFieldValues';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  NavLink,
} from 'react-router-dom';
import CancelIcon from 'designMaterials/CancelIcon';
import { SignupFormComponent1 } from './SignupFormComponent';
import back from 'components/parts/image/back.png';
import SignupForm2 from './SignupForm2';

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

function SignupForm({ user_id }) {
  const Navigate = useNavigate();
  // let location = useLocation();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FILED_VALUES);

  const [{ errorMessages }, signup] = useApiAxios(
    {
      url: 'accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handlepassbutton = (e) => {
    e.preventDefault();
    signup({ data: fieldValues }).then(() => {
      Navigate('/accounts/signup/2/');
    });
  };

  console.log(user_id);

  return (
    <section className="text-gray-600 body-font">
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
      <div className="lg:w-2/6 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
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

        <h2 className="flex text-gray-900 text-lg font-bold title-font mb-5 select-none">
          회원가입 페이지
        </h2>
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
        </Routes>
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 
                focus:outline-none hover:bg-indigo-600 rounded-full text-lg
              transition duration-500 ease-in-out hover:scale-105 w-full text-center"
          type="button"
          onClick={handlepassbutton}
        >
          다음으로
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3 select-none">
        ㈜ 유클리드소프트
      </p>
    </section>
  );
}

export default SignupForm;
