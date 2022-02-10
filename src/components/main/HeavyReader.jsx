import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { HeavyReaderSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function HeavyReader() {
  const [auth] = useAuth();
  const [{ data: email, loading, error }, refetch] = useApiAxios(
    {
      url: 'books/api/loanedbooks/',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <h3>♥ 다독왕 ♥</h3>
      <div>
        {/* {email &&
          email
            ?.map((email) => (
              <HeavyReaderSummary email={email} key={email.username} />
            ))
            .slice(1)} */}
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <DebugStates bookList={email} loading={loading} error={error} />
    </div>
  );
}

export default HeavyReader;
