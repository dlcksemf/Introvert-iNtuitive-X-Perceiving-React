import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

const INIT_FILED_VALUES = {
  username: '',
  // email: '',
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

  const [{ loading, error, errorMessages }, edit] = useApiAxios(
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
      data: fieldValues,
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
    } else if (showCancleModal) {
      Navigate('/test/');
    }
  };

  return (
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="w-[5] mt-3">
              <label>이름</label>
              <lable className="ml-1 mr-3 text-red-500">*</lable>
            </div>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              value={fieldValues.username}
              onChange={handleFieldChange}
              placeholder="이름을 입력해주세요."
            />
          </div>

          <div>
            <div className="w-[5] mt-3">
              <label>전화번호</label>
              <lable className="ml-1 mr-3 text-red-500">*</lable>
            </div>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone_num"
              value={fieldValues.phone_num}
              onChange={handleFieldChange}
              placeholder="핸드폰 번호를 입력해주세요."
            />
          </div>

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

          <div>
            <div className="w-[5] mt-3">
              <label className="mr-3">성별</label>
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

          {/* <ReactDatePicker
            className="bg-gray-300 w-fit text-center"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={addMonths(new Date(), 1)}
            isClearable={true}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
          /> */}
        </form>

        <button
          to={`/test/`}
          onClick={handleClickCancleButton}
          className="ml-30 border border-yellow-500 w-fit hover:bg-yellow-300 mb-5"
        >
          뒤로가기
        </button>

        <button
          className="ml-40 border border-lime-500 w-fit hover:bg-emerald-300 mb-5"
          onClick={handleClickSubmitButton}
        >
          회원가입
        </button>

        {(showSubmitModal || showCancleModal) && (
          <ConfirmationModal
            handleOkButton={handleOkButton}
            handleCancleButton={handleCancleButton}
          >
            {showSubmitModal ? '회원가입 하시겠습니까?' : '취소하시겠습니까?'}
          </ConfirmationModal>
        )}
      </div>
    </div>
  );
}

export default InfoEditModal;
