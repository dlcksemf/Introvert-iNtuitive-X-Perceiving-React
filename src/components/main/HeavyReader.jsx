import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { HeavyReaderSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function HeavyReader() {
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: 'books/api/loanedbooks/?all',
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
        {bookList
          ?.sort((book1, book2) => book1.book_num - book2.book_num)
          .slice(0, 1)
          .map((book) => (
            <HeavyReaderSummary book={book} key={book.book_num} />
          ))}
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <DebugStates bookList={bookList} loading={loading} error={error} />
    </div>
  );
}

export default HeavyReader;
