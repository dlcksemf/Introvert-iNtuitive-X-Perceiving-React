import { useApiAxios } from 'base/api/base';
// import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';
import Dropdown from 'react-dropdown';

function BookList() {
  const [query, setQuery] = useState();
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  const option = [1, 2, 3];
  // console.log(bookList.category_id);
  return (
    <div>
      <div className="flex justify-end">
        <div className="dropdown relative flex justify-between m-1 p-1">
          <Dropdown
            className="
              dropdown-toggle
              px-6
              py-2.5
              inline-block
              border-2
              border-blue-400
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-100 hover:shadow-lg
              focus:bg-blue-100 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-100 active:shadow-lg active:text-white
              transition
              duration-150
              ease-in-out
              flex
              items-center
              whitespace-nowrap
            "
            type="button"
            id="dropdownMenuButton8"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            options={option}
            onChange={option._onSelect}
            placeholder="카테고리"
          />
        </div>
        <div className="pt-2 relative text-gray-600">
          <input
            className="w-[200px] inline-block border-2 border-blue-400 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            onChange={getQuery}
            placeholder="제목/저자 검색"
            onKeyPress={search}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <ul className="bg-white rounded-lg w-96 text-gray-900">
          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}
          <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
            {bookList &&
              bookList?.map((book) => (
                <BookSummary book={book} key={book.book_num} />
              ))}
          </li>
        </ul>
      </div>
      {/* <DebugStates bookList={bookList} loading={loading} error={error} /> */}
    </div>
  );
}

export default BookList;
