import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { NewBookSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function NewBook() {
  const [auth] = useAuth();
  const [{ data: bookList }, refetch] = useApiAxios(
    {
      url: '/books/api/books/?all',
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
        <h1 className="text-5xl font-semibold relative bottom-7 text-left ml-40 mb-20 text-gray-700 select-none">
          신간도서
        </h1>
      </div>
      <div className="flex justify-center mb-28">
        {bookList?.slice(0, 3).map((book) => (
          <div
            key={book.book_num}
            className="h-[400px] w-[485px] flex justify-center items-center"
          >
            <NewBookSummary book={book} />
          </div>
        ))}
      </div>
    </>
  );
}

export default NewBook;
