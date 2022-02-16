import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import SearchBar from 'components/parts/SearchBar';
import StateCategory from 'components/parts/StateCategory';
import { itemsPerPage } from 'Constants';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import AdminBookSummary from './AdminBookSummary';

const STATELIST = ['All', 'Available', 'Borrowed', 'Deleted'];

function AdminBookList() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState(STATELIST[0]);
  const [auth] = useAuth();

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
        state: category === 'All' ? '' : category.slice(0, 1),
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category],
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
    <div className="my-5">
      <ToastContainer />
      <div className="text-center mb-2">
        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />

        <StateCategory
          stateList={STATELIST}
          selected={category}
          setSelected={setCategory}
        />
      </div>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {postList && (
        <div className="flex flex-wrap">
          {postList?.results?.map((post) => (
            <div
              key={post.id}
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
