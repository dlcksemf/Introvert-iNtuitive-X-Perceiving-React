import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <div>
      <h2>Book Application Form</h2>
      <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
        <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
          <form onSubmit={handleSubmit}>
            {DATA_FIELDS.map((dataType) => (
              <div className="mb-6">
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
            {/* <div className="mb-6">
              <input
                type="text"
                placeholder="Writer"
                name="writer"
                onChange={handleFieldChange}
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
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="publisher"
                onChange={handleFieldChange}
                placeholder="Publisher"
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
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="ISBN"
                onChange={handleFieldChange}
                placeholder="ISBN"
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
            </div> */}

            <div>
              <button
                type="submit"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookApplicationForm;
