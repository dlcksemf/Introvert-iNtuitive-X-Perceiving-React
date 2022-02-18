import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const DATA_FIELDS = ['username', 'phone_num', 'position'];

const initialValues = {};

function UserInfoForm() {
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(initialValues);
  const [auth] = useAuth();

  const [{ errorMessages }, saveUserInfo] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.user_id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit = () => {
    saveUserInfo({
      data: { ...fieldValues },
    })
      .then(() => {
        navigate('/books/application/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>User Info Form</h2>
      <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
        <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
          {DATA_FIELDS.map((dataType, index) => (
            <div key={index} className="mb-6">
              <input
                type="text"
                name={dataType}
                onChange={handleFieldChange}
                placeholder={dataType}
                className="
                      w-full
                      rounded
                      py-3
                      px-[14px]
                      text-body-color text-base
                      border border-[f0f0f0]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
              />
              {errorMessages[dataType] &&
                errorMessages[dataType].map((message, index) => (
                  <p key={index} className="text-xs text-red-400">
                    {message}
                  </p>
                ))}
            </div>
          ))}

          <DebugStates fieldValues={fieldValues} />

          <div>
            <button
              onClick={handleSubmit}
              className="
                      w-full
                      text-black
                      bg-primary
                      rounded
                      border border-primary
                      p-3
                      transition
                      hover:bg-opacity-90
                      "
            >
              Send Message
            </button>

            <button
              //   onClick={handleClickCancleButton}
              className="
                      w-full
                      text-black
                      bg-primary
                      rounded
                      border border-primary
                      p-3
                      transition
                      hover:bg-opacity-90
                      "
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
      {/* {(showSubmitModal || showCancleModal) && (
        <ConfirmationModal
          handleOkButton={handleOkButton}
          handleCancleButton={handleCancleButton}
        >
          {showSubmitModal ? 'Save?' : 'Cancle?'}
        </ConfirmationModal>
      )} */}
    </div>
  );
}

export default UserInfoForm;
