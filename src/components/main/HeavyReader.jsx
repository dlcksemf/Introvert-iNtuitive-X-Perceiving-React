import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { HeavyReaderSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function HeavyReader() {
  const [auth] = useAuth();
  const [{ data: userList }, refetch] = useApiAxios(
    {
      url: '/accounts/api/users/?all',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth, refetch]);

  return (
    <>
      <div>
        {userList
          ?.sort((user1, user2) => user2.count_loans - user1.count_loans)
          .slice(0, 1)
          .map((book) => (
            <HeavyReaderSummary
              book={book.count_loans !== 0 && book}
              key={book.count_loans}
            />
          ))}
      </div>
    </>
  );
}

export default HeavyReader;
