import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import BookApplicationForm from './BookApplicationForm';

const INIT_VALUE = {};

function BookApplicationSearch({ setQuery, handleSubmit }) {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={'ISBN으로 검색'}
          autoComplete="off"
          className="p-2 w-[270px] text-gray-900 bg-gray-50 rounded-lg focus:outline-none 
          hover:font-semibold select-none border border-gray-300 sm:text-md"
        />

        <button className="ml-2" onClick={handleSubmit}>
          <div
            className="flex py-2 px-2 rounded-lg
                  text-gray-600 hover:text-indigo-600 hover:font-bold 
                  border-2 border-gray-200 focus:outline-none rounded
                  select-none"
          >
            검색
          </div>
        </button>
      </form>
    </div>
  );
}

export default BookApplicationSearch;
