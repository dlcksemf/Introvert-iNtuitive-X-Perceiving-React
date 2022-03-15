import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import BookApplicationForm from './BookApplicationForm';

const INIT_VALUE = {};

function BookApplicationSearch({ setQuery, handleSubmit }) {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUE);

  return (
    <div>
      검색
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={'ISBN으로 검색가능'}
          autoComplete="off"
          className="
                  w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none hover:font-semibold"
        />
        <button onClick={handleSubmit}>검색하기</button>
      </form>
    </div>
  );
}

export default BookApplicationSearch;
