import { useNavigate } from 'react-router-dom';
import BookApplicationComponent from './BookApplicationComponent';
import { useApiAxios } from 'base/api/base';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import SearchBar from 'components/parts/SearchBar';
import StateCategory from 'components/parts/StateCategory';

const STATELIST = ['All', 'Pending', 'Order', 'Denied'];

function BookApplicationList({ itemsPerPage = 2 }) {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0);
  const [abc, setAbc] = useState(STATELIST[0]);

  const [query, setQuery] = useState();

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: page
        ? `/books/api/applications${page ? '/?page=' + (page + 1) : '/'}`
        : `/books/api/applications/?query=${query ? query : ''}&state=${
            abc === 'All' ? '' : abc.slice(0, 1)
          }`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
    setCurrentItems(data?.results);
  }, [data]);

  useEffect(() => {
    getApplications();
  }, [page]);

  useEffect(() => {
    getApplications();
  }, [abc]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleSubmit = () => {
    getApplications().then(() => {
      setQuery('');
    });
  };

  return (
    <>
      <div className="flex">
        <button
          onClick={() => {
            navigate('/books/application/new/');
          }}
          className="my-5 ml-3 mr-10"
        >
          신청하기!
        </button>

        <StateCategory
          stateList={STATELIST}
          selected={abc}
          setSelected={setAbc}
        />

        <SearchBar
          handleChange={setQuery}
          handleSubmit={handleSubmit}
          value={query}
        />
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
    </>
  );
}

export default BookApplicationList;
