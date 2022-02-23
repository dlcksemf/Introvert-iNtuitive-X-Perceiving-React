import { useApiAxios } from 'base/api/base';
import { useCallback, useEffect, useState } from 'react';
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
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-col text-center w-full">
            <div className="flex flex-col text-center w-full">
              <div className="flex justify-end">
                <h1 className="text-2xl font-medium title-font text-gray-900 tracking-widest m-auto mr-56">
                  전체 도서 목록
                </h1>
                <div className="dropdown relative flex space-y-2 justify-between m-1 p-2.5">
                  <Category selected={category} setSelected={setCategory} />
                </div>
                <div className="pt-2 relative text-gray-600">
                  <SearchBar
                    handleChange={setQuery}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
              <div class="flex flex-wrap -m-4">
                <div class="p-4 lg:w-1/2">
                  <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <ul className="mt-28">
                        {loading && '로딩 중 ...'}
                        {error && '로딩 중 에러가 발생했습니다.'}
                        {bookList?.results?.map((book) => (
                          <li>
                            <BookSummary book={book} key={book.book_num} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookList;
