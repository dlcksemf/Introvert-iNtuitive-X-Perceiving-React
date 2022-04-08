import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import BookApplicationForm from './BookApplicationForm';

const INIT_VALUE = {};

function BookApplicationSearch({ setQuery, handleSubmit }) {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={'ISBN으로 검색가능'}
          autoComplete="off"
          className="
                  w-5/6 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none hover:font-semibold"
        />

        <button className="ml-2" onClick={handleSubmit}>
          <div
            className="flex 
                  text-gray-600 hover:text-indigo-600 hover:font-bold 
                  border-2 border-gray-200 p-2 focus:outline-none rounded
                  "
          >
            검색
          </div>
        </button>
      </form>
    </div>
  );
}

export default BookApplicationSearch;
