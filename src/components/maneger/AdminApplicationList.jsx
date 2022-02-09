import { useApiAxios } from 'base/api/base';
import Pagination from 'design materials/Pagination';
import { createContext, useEffect, useState } from 'react';
import AdminApplication from './AdminApplication';

const RenderContext = createContext();

function AdminApplicationList() {
  const [page, setPage] = useState('1');

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: `/books/api/applications/?page=${page ? page : '1'}`,
      method: 'GET',
    },
    { manual: true },
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    getApplications();
  }, [reload]);

  useEffect(() => {
    getApplications();
  }, [page]);

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

        <Pagination setPage={setPage} dataNum={data?.count ? data.count : 2} />
      </RenderContext.Provider>
    </div>
  );
}

export { RenderContext, AdminApplicationList };
