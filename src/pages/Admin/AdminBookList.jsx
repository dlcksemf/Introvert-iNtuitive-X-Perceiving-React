import { useApiAxios } from 'base/api/base';
import SearchBar from 'components/parts/SearchBar';
import { itemsPerPage } from 'Constants';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import AdminBookSummary from './AdminBookSummary';

function AdminBookList() {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  const [query, setQuery] = useState();

  const [{ data: postList, loading, error }, refetch] = useApiAxios(
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
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query, refetch],
  );

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="my-5">
      <ToastContainer />
      <div className="text-right mb-2 mr-4">
        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
      </div>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {postList && (
        <div className="flex flex-wrap">
          {postList?.results?.map((post) => (
            <div
              key={post.book_num}
              className="w-full md:w-1/2 xl:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300"
            >
              <AdminBookSummary post={post} />
            </div>
          ))}
        </div>
      )}

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
  );
}

export default AdminBookList;
