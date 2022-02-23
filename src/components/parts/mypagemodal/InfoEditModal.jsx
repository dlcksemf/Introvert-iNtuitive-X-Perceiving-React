import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import { useEffect, useState } from 'react';
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
  const Navigate = useNavigate();
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [showSubmitModal, setshowSubmitModal] = useState(false);
  const [auth] = useAuth();

  const [{ data }, refetch] = useApiAxios(
    {
      url: `accounts/api/users/${auth.user_id}`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{}, edit] = useApiAxios(
    {
      url: `accounts/api/users/${auth.user_id}/`,
      method: 'PATCH',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  const { fieldValues, handleFieldChange } = useFieldValues(
    data || INIT_FILED_VALUES,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    edit({
      url: `accounts/api/users/${auth.user_id}/`,
      data: { ...fieldValues },
    }).then(() => {
      Navigate('/accounts/mypage/');
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

  const handleOkButton = (e) => {
    if (showSubmitModal) {
      handleSubmit(e);
      window.location.replace('/accounts/mypage');
    } else if (showCancleModal) {
      Navigate('/accounts/mypage/');
    }
  };

  return (
    <div class="h-screen flex justify-center items-center">
      <div class="w-2/3">
        <form
          class="bg-white p-10 rounded-lg shadow-lg min-w-full"
          onSubmit={handleSubmit}
        >
          <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            내정보
          </h1>

          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="username"
            >
              이름
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              name="username"
              value={fieldValues.username}
              onChange={handleFieldChange}
              placeholder="이름을 입력해주세요."
            />
          </div>

          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="email"
            >
              전화번호
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              name="phone_num"
              value={fieldValues.phone_num}
              onChange={handleFieldChange}
              placeholder="핸드폰 번호를 입력해주세요."
            />
          </div>

          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="password"
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
                class="text-gray-800 font-semibold block my-3 text-md"
                for="confirm"
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
                  <option>F</option>
                  <option>M</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleClickSubmitButton}
            class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            ⠀정보 수정⠀
          </button>
          <button
            to={`/accounts/mypage/`}
            onClick={handleClickCancleButton}
            class="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
          >
            ⠀취소⠀
          </button>

          {/* 
          <ReactDatePicker
            className="bg-gray-300 w-fit text-center"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            maxDate={new Date()}
            // isClearable={true}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
          /> */}
        </form>

        {(showSubmitModal || showCancleModal) && (
          <ConfirmationModal
            handleOkButton={handleOkButton}
            handleCancleButton={handleCancleButton}
          >
            {showSubmitModal ? '정보 수정 하시겠습니까?' : '취소하시겠습니까?'}
          </ConfirmationModal>
        )}
      </div>
    </div>
  );
}

export default InfoEditModal;
