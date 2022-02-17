import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { Top5Summary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function Top5() {
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/loanedbooks/?all',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <h3>Top5 목록</h3>
      <div>
        {bookList
          ?.sort((book1, book2) => book1.book_num - book2.book_num)
          .filter((element, index) => {
            return bookList.indexOf(element) === index;
          })
          .slice(0, 5)
          .map((book) => (
            <Top5Summary book={book} key={book.book_num} />
          ))}
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <DebugStates loanedbooks={bookList} loading={loading} error={error} />
    </div>
  );
}

export default Top5;
