import { useApiAxios } from 'base/api/base';
import React, { useCallback, useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';
import SearchBar from 'components/parts/SearchBar';
import ReactPaginate from 'react-paginate';
import Category from 'components/parts/Category';
import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function BookList() {
  const navigate = useNavigate();
  let { state } = useLocation();

  let [searchParams] = useSearchParams();
  let categoryParams = searchParams.get('category');
  let pageParams = searchParams.get('page');
  let queryParams = searchParams.get('query');

  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(() => {
    return pageParams ? pageParams : 1;
  });

  const [category, setCategory] = useState(() => {
    return categoryParams ? categoryParams : '카테고리';
  });

  const [query, setQuery] = useState(queryParams || '');

  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/books/?page_size=8',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(async () => {
    const params = {
      page: pageParams,
      query: queryParams,
      category: categoryParams === '카테고리' ? '' : categoryParams,
    };

    const { data } = await refetch({ params });

    setPageCount(Math.ceil(data.count / 8));
    setCurrentItems(data?.results);
  }, [categoryParams, queryParams, pageParams, refetch]);

  useEffect(() => {
    page &&
      navigate(
        `/books/booklist/?page=${page}&category=${category}&query=${query}`,
      );
  }, [page]);

  useEffect(() => {
    state?.pathname
      ? navigate(
          `/books/booklist/?page=${pageParams}&category=${category}&query=${query}`,
        )
      : navigate(`/books/booklist/?page=1&category=${category}&query=${query}`);
  }, [category]);

  useEffect(() => {
    fetchApplications();
  }, [categoryParams, pageParams, queryParams]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/books/booklist/?page=1&category=${category}&query=${query}`);
  };

  return (
    <>
      <div className="border-b-4 border-sky-600 w-[1140px] relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          전체 도서 목록
        </h2>
        <div className="flex select-none">
          <div className="absolute left-[730px] bottom-[10px]">
            <Category selected={category} setSelected={setCategory} />
          </div>
          <div className="absolute left-[888px] bottom-[10px]">
            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full">
          <div className="flex justify-end">
            <div className="absolute flex justify-end items-end top-[80px]">
              {loading && '로딩 중 ...'}
              {error && navigate(`*`)}
            </div>
          </div>
          <div className="flex flex-wrap mx-4 mb-10 z-0">
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
      <div className="relative top-[20px] select-none">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          forcePage={page - 1}
          onPageChange={handlePageClick}
          pageRangeDisplayed="2"
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          siblingCount="1"
          className="pagination"
        />
        <ToastContainer />
      </div>
    </>
  );
}
export default BookList;
