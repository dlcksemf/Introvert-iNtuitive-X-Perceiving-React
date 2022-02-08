import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect } from 'react';
import BookSummary from './BookSummary';

function BookList() {
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/books/',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {bookList &&
        bookList.map((book) => <BookSummary book={book} key={book.book_num} />)}
      <DebugStates bookList={bookList} loading={loading} error={error} />
    </div>
  );
}

export default BookList;
