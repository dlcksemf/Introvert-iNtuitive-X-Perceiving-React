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
  const [category, setCategory] = useState(STATELIST[0]);

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: `/books/api/applications/?${page ? 'page=' + (page + 1) : ''}${
        category !== 'All' ? '&state=' + category.slice(0, 1) : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setPage(0);
    setReload((prevState) => !prevState);
  }, [category]);

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  useEffect(() => {
    getApplications()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  return (
    <div>
      <div className="flex">
        <h2 className="mx-3">Admin Book Application</h2>
        <StateCategory
          stateList={STATELIST}
          selected={category}
          setSelected={setCategory}
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
