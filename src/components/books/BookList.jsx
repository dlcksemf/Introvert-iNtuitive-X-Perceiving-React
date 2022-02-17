import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { useCallback, useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';
// import Dropdown from 'react-dropdown';
import StateCategory from 'components/parts/StateCategory';
import SearchBar from 'components/parts/SearchBar';
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from 'Constants';
import Category from 'components/parts/Category';

function BookList() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState();
  const [auth] = useAuth();

  const [query, setQuery] = useState();

  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/books/',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        category: category === 'All' ? '' : category,
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category, query],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="dropdown relative flex justify-between m-1 p-1">
          <Category selected={category} setSelected={setCategory} />
        </div>
        <div className="pt-2 relative text-gray-600">
          <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
        </div>
      </div>
      <div className="flex justify-center">
        <ul className="bg-white rounded-lg w-96 text-gray-900">
          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}
          <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
            {bookList?.results?.map((book) => (
              <BookSummary book={book} key={book.book_num} />
            ))}
          </li>
        </ul>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
      <DebugStates bookList={bookList} loading={loading} error={error} />
    </div>
  );
}

export default BookList;
