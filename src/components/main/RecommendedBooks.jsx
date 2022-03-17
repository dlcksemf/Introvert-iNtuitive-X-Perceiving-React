import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { RecommendedBooksSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';

function RecommendedBooks() {
  const [auth] = useAuth();
  const [{ data: bookList }, refetch] = useApiAxios(
    {
      url: '/books/api/loanedbooks/?all',
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
        <h1 className="text-5xl font-semibold relative bottom-7 text-left ml-40 mb-[60px] text-gray-700 select-none">
          추천도서
        </h1>
      </div>
      <div>
        {bookList?.slice(0, 3).map(
          (book) =>
            book?.birthdate &&
            auth.birthdate &&
            book(
              <div>
                <RecommendedBooksSummary book={book} />
              </div>,
            ),
        )}
      </div>
    </>
  );
}

export default RecommendedBooks;
