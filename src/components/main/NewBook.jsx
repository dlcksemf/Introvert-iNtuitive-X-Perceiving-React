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
    <div className="">
      <div>
        <h1 className="text-4xl font-semibold relative bottom-7 text-center mb-[100px] text-gray-700 select-none">
          신간도서
        </h1>
      </div>
      <div className="flex justify-center mb-28">
        {bookList?.slice(0, 3).map((book) => (
          <div
            key={book.book_num}
            className="h-[370px] w-[400px] flex justify-center items-center"
          >
            <NewBookSummary book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBook;
