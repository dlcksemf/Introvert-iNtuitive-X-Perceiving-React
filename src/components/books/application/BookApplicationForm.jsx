import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const INIT_VALUE = {};

const DATA_FIELDS = ['title', 'writer', 'publisher', 'ISBN'];

function BookApplicationForm() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCancleModal, setShowCancleModal] = useState(false);

  const [{ loading, error, errorMessages }, saveApplication] = useApiAxios(
    {
      url: '/books/api/applications/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit = () => {
    saveApplication({
      data: { ...fieldValues, state: 'P', email: auth.email },
    })
      .then(() => {
        navigate('/books/application/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    setShowSubmitModal(true);
  };

  const handleClickCancleButton = (e) => {
    e.preventDefault();
    setShowCancleModal(true);
  };

  const handleOkButton = () => {
    if (showSubmitModal) {
      handleSubmit();
    } else if (showCancleModal) {
      navigate('/books/application/');
    }
  };

  const handleCancleButton = () => {
    if (showSubmitModal) {
      setShowSubmitModal(false);
    } else if (showCancleModal) {
      setShowCancleModal(false);
    }
  };

  return (
    <div>
      <h2>Book Application Form</h2>
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
              onClick={handleClickSubmitButton}
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
              onClick={handleClickCancleButton}
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

      {(showSubmitModal || showCancleModal) && (
        <ConfirmationModal
          handleOkButton={handleOkButton}
          handleCancleButton={handleCancleButton}
        >
          {showSubmitModal ? 'Save?' : 'Cancle?'}
        </ConfirmationModal>
      )}
    </div>
  );
}

export default BookApplicationForm;
