import { useNavigate } from 'react-router-dom';
import BookApplicationComponent from './BookApplicationComponent';
import { useApiAxios } from 'base/api/base';
import Pagination from 'design materials/Pagination';
import { useEffect, useState } from 'react';
import { useRender } from 'base/hooks/RenderContext';

function BookApplicationList() {
  const navigate = useNavigate();
  const [page, setPage] = useState('1');

  const [reload, setReload] = useRender();

  const [{ data, loading, error }, getApplications] = useApiAxios(
    {
      url: `/books/api/applications/?page=${page ? page : '1'}`,
      method: 'GET',
    },
    { manual: true },
  );

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
      <button
        onClick={() => {
          navigate('/books/application/new/');
        }}
      >
        신청하기!
      </button>

      {data?.results?.map((application) => {
        return (
          <BookApplicationComponent
            key={application.application_num}
            application={application}
          />
        );
      })}

      <hr />

      <Pagination setPage={setPage} dataNum={data?.count ? data.count : 2} />
    </div>
  );
}

export default BookApplicationList;
