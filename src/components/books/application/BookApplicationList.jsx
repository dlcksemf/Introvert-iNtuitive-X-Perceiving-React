import { useNavigate } from 'react-router-dom';
import BookApplicationComponent from './BookApplicationComponent';
import { useApiAxios } from 'base/api/base';
import { useEffect, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import SearchBar from 'components/parts/SearchBar';
import StateCategory from 'components/parts/StateCategory';
import { useAuth } from 'base/hooks/Authcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginToast from 'components/parts/LoginToast';

const STATELIST = ['All', 'Pending', 'Order', 'Denied'];

function BookApplicationList({ itemsPerPage = 2 }) {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState(STATELIST[0]);
  const [checked, setChecked] = useState(false);
  const [auth] = useAuth();
  const [showBackDrop, setShowBackDrop] = useState(false);

  const [query, setQuery] = useState();

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: '/books/api/applications/',
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
        user_id: checked ? auth.user_id : '',
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category, checked],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [checked, category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApplications(1, query);
  };

  const handleClick = () => {
    if (auth.isLoggedIn) {
      navigate('/books/application/new/');
    } else {
      toast(<LoginToast />, {
        onOpen: () => setShowBackDrop(true),
        onClose: () => setShowBackDrop(false),
      });
      toast.clearWaitingQueue();
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="flex">
          <div className="text-xs">본인 신청 도서</div>
          <input
            type="checkbox"
            value={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
        </div>

        <button onClick={handleClick} className="my-5 ml-3 mr-10">
          신청하기!
        </button>

        <StateCategory
          stateList={STATELIST}
          selected={category}
          setSelected={setCategory}
        />

        <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
      </div>

      <div className="h-64 mx-3">
        {currentItems?.map((application) => {
          return (
            <BookApplicationComponent
              key={application.application_num}
              application={application}
            />
          );
        })}
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

      <div
        className={`bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ${
          !showBackDrop && 'invisible'
        }`}
      />
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        limit={1}
      />
    </div>
  );
}

export default BookApplicationList;
