import { useApiAxios } from 'base/api/base';
import { createContext, useEffect, useState } from 'react';
import AdminApplication from './AdminApplication';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';

const RenderContext = createContext();

function AdminApplicationList({ itemsPerPage = 2 }) {
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
  const [reload, setReload] = useState(false);

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

  useEffect(() => {
    getApplications();
  }, [reload]);

  return (
    <div>
      <h2>Admin Book Application</h2>

      <RenderContext.Provider value={{ setReload, reload }}>
        {data?.results?.map((application) => {
          return (
            <AdminApplication
              key={application.application_num}
              application={application}
            />
          );
        })}
      </RenderContext.Provider>

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

export { RenderContext, AdminApplicationList };
