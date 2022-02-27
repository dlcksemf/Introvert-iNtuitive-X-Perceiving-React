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
import { itemsPerPage } from 'Constants';

const STATELIST = ['All', 'Pending', 'Order', 'Denied'];

function BookApplicationList() {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [category, setCategory] = useState(STATELIST[0]);
  const [checked, setChecked] = useState(false);
  const [auth] = useAuth();
  const [showBackDrop, setShowBackDrop] = useState(false);

  const [query, setQuery] = useState();

  const [, getApplications] = useApiAxios(
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
    [category, checked, query, auth, getApplications],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [checked, category, fetchApplications]);

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
    <div className="w-3/4 m-auto">
      <div className="flex flex-col text-center w-full">
        <div className="flex justify-end">
          <h3 className="text-2xl font-medium title-font text-gray-900 tracking-widest m-auto mb-8 mt-4">
            도서 신청 목록
          </h3>
          <div className="absolute flex justify-end items-end mb-28 mr-4">
            <div>
              <StateCategory
                stateList={STATELIST}
                selected={category}
                setSelected={setCategory}
              />
            </div>
            <div>
              <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <label className="ml-4 inline-flex items-center mt-3">
            <input
              type="checkbox"
              value={checked}
              className="form-checkbox h-5 w-5 text-yellow-600"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <div className="ml-2 text-gray-700">본인 신청 도서</div>
          </label>

          <button
            onClick={handleClick}
            className="mr-5 bg-indigo-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider  text-indigo-100 rounded-full hover:shadow-2xl hover:bg-indigo-600"
          >
            도서 신청
          </button>
        </div>
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      도서명
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      저자
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      출판사
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ISBN
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      신청상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((application) => {
                    return (
                      <BookApplicationComponent
                        key={application.application_num}
                        application={application}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
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
