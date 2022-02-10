import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { BookSummary } from './BookSummary';

function BookList() {
  const [query, setQuery] = useState();
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div>
      <div className="text-right mb-2">
        <input
          type="text"
          onChange={getQuery}
          placeholder="도서제목 / 저자명 검색"
          onKeyPress={search}
        />
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {bookList &&
        bookList?.map((book) => (
          <BookSummary book={book} key={book.book_num} />
        ))}
      <DebugStates bookList={bookList} loading={loading} error={error} />
    </div>
  );
}

export default BookList;
