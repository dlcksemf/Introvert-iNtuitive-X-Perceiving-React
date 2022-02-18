import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { HeavyReaderSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function HeavyReader() {
  const [auth] = useAuth();
  const [{ data: userList, loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/users/?all',
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
        {userList
          ?.sort((user1, user2) => user2.count_loans - user1.count_loans)
          .slice(0, 1)
          .map((book) => (
            <HeavyReaderSummary book={book} key={book.count_loans} />
          ))}
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <DebugStates bookList={userList} />
    </div>
  );
}

export default HeavyReader;
