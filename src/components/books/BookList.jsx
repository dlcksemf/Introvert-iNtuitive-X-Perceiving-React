import { useApiAxios } from 'base/api/base';
import React, { useCallback, useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';
import SearchBar from 'components/parts/SearchBar';
import ReactPaginate from 'react-paginate';
import Category from 'components/parts/Category';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NotFound from 'components/parts/NotFound';

function BookList() {
  const navigate = useNavigate();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('전체');

  const [query, setQuery] = useState();

  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/books/?page_size=8',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        category: category === '전체' ? '' : category,
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / 8));
      setCurrentItems(data?.results);
    },
    [category, query, refetch],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [category, fetchApplications]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col text-center w-full">
            <div className="flex justify-end">
              <h1
                className="text-2xl font-semibold title-font text-gray-900 tracking-widest m-auto mb-36 mt-4
              select-none"
              >
                전체 도서 목록
              </h1>
              <div className="absolute flex justify-end items-end mb-28">
                <div className="mr-3">
                  <Category selected={category} setSelected={setCategory} />
                </div>
                <div>
                  <SearchBar
                    handleChange={setQuery}
                    handleSubmit={handleSubmit}
                  />
                </div>
                {loading && '로딩 중 ...'}
                {error && navigate(`*`)}
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {bookList?.results?.map((book) => (
                <React.Fragment key={book.book_num}>
                  <BookSummary
                    book={book}
                    reloadBook={() => {
                      fetchApplications(page);
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-14">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed="2"
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          siblingCount="1"
          className="pagination mb-14"
        />

        <ToastContainer />
      </div>
    </>
  );
}

export default BookList;
