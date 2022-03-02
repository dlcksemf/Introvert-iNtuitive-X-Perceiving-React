import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FILED_VALUES = {
  username: '',
  email: '',
  phone_num: '',
  position: '',
  gender: '',
  birthdate: '',
};

function InfoEditModal() {
  const navigate = useNavigate();
  const [auth, , , logout] = useAuth();

  const [{ data }, refetch] = useApiAxios(
    {
      url: `accounts/api/users/${auth.user_id}`,
      method: 'GET',
    },
    { manual: true },
  );

  const [, edit] = useApiAxios(
    {
      url: `accounts/api/users/${auth.user_id}/`,
      method: 'PATCH',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth, refetch]);

  const { fieldValues, handleFieldChange } = useFieldValues(
    data || INIT_FILED_VALUES,
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClickSubmitButton = (e) => {
    e.preventDefault();

    edit({
      url: `accounts/api/users/${auth.user_id}/`,
      data: { ...fieldValues },
    }).then(() => {
      window.confirm('재로그인 해야 합니다. 로그아웃 하시겠습니까?')
        ? handleLogout()
        : navigate('/accounts/mypage/');
    });
  };

  const handleClickCancleButton = (e) => {
    e.preventDefault();
    window.confirm('취소하시겠습니까?') && navigate('/accounts/mypage/');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-2/3">
        <form
          className="bg-white p-10 rounded-lg shadow-lg min-w-full"
          onSubmit={handleClickSubmitButton}
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            내정보
          </h1>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="username"
            >
              이름
            </label>
            <input
              type="text"
              className="w-full bg-amber-100 px-4 py-2 rounded-lg focus:outline-none"
              name="username"
              value={fieldValues.username}
              onChange={handleFieldChange}
              placeholder="이름을 입력해주세요."
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="email"
            >
              전화번호
            </label>
            <input
              type="text"
              className="w-full bg-amber-100 px-4 py-2 rounded-lg focus:outline-none"
              name="phone_num"
              value={fieldValues.phone_num}
              onChange={handleFieldChange}
              placeholder="핸드폰 번호를 입력해주세요."
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="birthdate"
            >
              생년월일
            </label>
            <input
              type="date"
              className="w-full bg-amber-100 px-4 py-2 rounded-lg focus:outline-none"
              name="birthdate"
              value={fieldValues.birthdate}
              onChange={handleFieldChange}
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="password"
            >
              직급
            </label>

            <select
              className="block border border-grey-light w-full p-3 rounded mb-4"
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

          <div>
            <div className="w-[5] mt-3">
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="confirm"
              >
                성별
              </label>
              <div>
                <select
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="gender"
                  value={fieldValues.gender}
                  onChange={handleFieldChange}
                >
                  <option className="hidden">성별을 선택해주세요.</option>
                  <option value="F">여성</option>
                  <option value="M">남성</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleClickSubmitButton}
            className="w-full mt-6 bg-amber-600 rounded-full px-4 py-2 text-lg text-white
            tracking-wide font-semibold font-sans transition duration-500 ease-in-out hover:bg-amber-500"
          >
            정보 수정
          </button>
          <button
            onClick={handleClickCancleButton}
            className="w-full mt-6 mb-3 bg-yellow-300 rounded-full px-4 py-2 text-lg text-gray-800
            tracking-wide font-semibold font-sans transition duration-500 ease-in-out hover:bg-yellow-200"
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default InfoEditModal;
