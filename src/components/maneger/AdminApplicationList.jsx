import { useApiAxios } from 'base/api/base';
import { createContext, useEffect, useState } from 'react';
import AdminApplication from './AdminApplication';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import StateCategory from 'components/parts/StateCategory';

const RenderContext = createContext();
const STATELIST = ['All', 'Pending', 'Order', 'Denied'];

function AdminApplicationList({ itemsPerPage = 2 }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [abc, setAbc] = useState(STATELIST[0]);

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: page
        ? `/books/api/applications${page ? '/?page=' + (page + 1) : '/'}`
        : `/books/api/applications/?state=${
            abc === 'All' ? '' : abc.slice(0, 1)
          }`,
      method: 'GET',
    },
    { manual: true },
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
    setCurrentItems(data?.results);
  }, [data]);

  useEffect(() => {
    getApplications().catch((error) => {
      console.log('page');

      console.log(error);
    });
  }, [page]);

  useEffect(() => {
    getApplications().catch((error) => {
      console.log('state');

      console.log(error);
    });
  }, [abc]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    getApplications().catch((error) => {
      console.log('reload');
      console.log(error);
    });
  }, [reload]);

  return (
    <div>
      <div className="flex">
        <h2 className="mx-3">Admin Book Application</h2>
        <StateCategory
          stateList={STATELIST}
          selected={abc}
          setSelected={setAbc}
        />
      </div>

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
