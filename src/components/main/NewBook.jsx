import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect } from 'react';

function NewBook() {
  const [auth] = useAuth();
  const [{ data: _, loading, error }, refetch] = useApiAxios(
    {
      url: '/book/api/booklist/',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <h3>신간 도서 목록입니다.</h3>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <DebugStates loading={loading} error={error} />
    </div>
  );
}

export default NewBook;
