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
    <>
      <div className="border-b-4 border-sky-600 w-[1140px] relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          신청 도서 목록
        </h2>
        <div className="flex select-none">
          <div className="absolute left-[888px] bottom-[10px]">
            <SearchBar handleChange={setQuery} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="w-[1170px] m-auto relative left-[55px] h-[700px]">
        {/* <div className="flex flex-col text-center w-full">
          <div className="flex justify-end">
            <div className="absolute flex justify-end items-end mb-28 mr-4">
              <div>
                <StateCategory
                  stateList={STATELIST}
                  selected={category}
                  setSelected={setCategory}
                />
              </div>
            </div>
          </div>
        </div> 이건 뭘 하는 애일까???? */}

        <div className="flex justify-between">
          <button
            onClick={handleClick}
            className="bg-indigo-500 text-white h-[40px] w-[120px] relative top-1.5 right-[30px]
          text-md font-semibold tracking-wider rounded-lg hover:bg-indigo-600
          "
          >
            도서 신청하기
          </button>
          <label className="inline-flex items-center relative right-[67px] top-[15px]">
            <input
              type="checkbox"
              value={checked}
              className="form-checkbox h-4 w-4 relative top-[1px]"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <div className="text-gray-700 text-lg relative left-[7px]">
              본인 신청 도서
            </div>
          </label>
        </div>
        <section className="relative right-[45px] top-[10px]">
          <div className="w-full xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded ">
              <table className="items-center bg-transparent w-full border-collapse mt-1 select-none">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                      도서명
                    </th>
                    <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                      저자
                    </th>
                    <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                      출판사
                    </th>
                    <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                      ISBN
                    </th>
                    <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
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

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="pagination relative top-[40px] right-[45px]"
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
    </>
  );
}

export default BookApplicationList;
