import { useApiAxios } from 'base/api/base';
import React, { useCallback, useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';
import SearchBar from 'components/parts/SearchBar';
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from 'Constants';
import Category from 'components/parts/Category';

function BookList() {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState('All');

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
      setPageCount(Math.ceil(data.count / 4));
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
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              전체 도서 목록
            </h1>
            <div class="flex justify-end items-end">
              <Category selected={category} setSelected={setCategory} />
              <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
              {loading && '로딩 중 ...'}
              {error && '로딩 중 에러가 발생했습니다.'}
            </div>
          </div>
          <div class="flex flex-wrap -m-4">
            {bookList?.results?.map((book) => (
              <React.Fragment>
                <BookSummary book={book} key={book.book_num} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}

export default BookList;
