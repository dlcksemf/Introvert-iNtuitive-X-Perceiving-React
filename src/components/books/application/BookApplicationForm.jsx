import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const INIT_VALUE = {};

const DATA_FIELDS = ['title', 'writer', 'publisher', 'ISBN'];

function BookApplicationForm() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);

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

  const handleClickSubmitButton = (e) => {
    e.preventDefault();

    window.confirm('신청하시겠습니까?') &&
      saveApplication({
        data: { ...fieldValues, state: 'P', user_id: auth.user_id },
      })
        .then((response) => {
          toast.info(`💫 ${response.data.title}(이)가 신청 되었습니다`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/books/application/');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleClickCancleButton = (e) => {
    e.preventDefault();

    window.confirm('취소하시겠습니까?') && navigate(-1);
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-1/3">
          <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
            <h2 className="mb-10 text-center text-2xl text-gray-600 font-bold font-sans">
              📚도서 신청 폼📖
            </h2>
            {DATA_FIELDS.map((dataType, index) => (
              <div key={index} className="mb-6">
                <input
                  type="text"
                  name={dataType}
                  onChange={handleFieldChange}
                  placeholder={dataType}
                  className="
                  w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none
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

            <div>
              <button
                onClick={handleClickSubmitButton}
                className="
                w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans
                        "
              >
                도서 신청하기
              </button>

              <button
                onClick={handleClickCancleButton}
                className="
                w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans
                        "
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookApplicationForm;
