import { useNavigate } from 'react-router-dom';
import BookApplicationComponent from './BookApplicationComponent';
import { useApiAxios } from 'base/api/base';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';

function BookApplicationList({ itemsPerPage = 2 }) {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: `/books/api/applications/?page=${page ? page + 1 : '1'}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(data?.count / itemsPerPage));
    setCurrentItems(data?.results);
  }, [data]);

  useEffect(() => {
    getApplications();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  return (
    <>
      <button
        onClick={() => {
          navigate('/books/application/new/');
        }}
        className="my-5 mx-3"
      >
        신청하기!
      </button>

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
