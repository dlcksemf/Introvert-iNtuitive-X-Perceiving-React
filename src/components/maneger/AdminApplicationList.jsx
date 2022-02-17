import { useApiAxios } from 'base/api/base';
import { useCallback, useEffect, useState } from 'react';
import AdminApplication from './AdminApplication';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import StateCategory from 'components/parts/StateCategory';

const STATELIST = ['All', 'Pending', 'Order', 'Denied'];

function AdminApplicationList({ itemsPerPage = 2 }) {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(STATELIST[0]);

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: '/books/api/applications/',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage) => {
      const params = {
        page: newPage,
        state: category === 'All' ? '' : category.slice(0, 1),
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data.results);
    },
    [category, query],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications, category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
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

      {data?.results?.map((application) => {
        return (
          <AdminApplication
            key={application.application_num}
            application={application}
            reload={() => {
              fetchApplications(page);
            }}
          />
        );
      })}

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

export default AdminApplicationList;
