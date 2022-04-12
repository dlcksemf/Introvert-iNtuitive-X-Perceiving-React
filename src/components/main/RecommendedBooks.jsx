import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { RecommendedBooksSummary } from 'components/books/BookSummary';
import { useEffect, useState } from 'react';

function RecommendedBooks() {
  const [auth] = useAuth();
  const [{ data: bookList }, refetch] = useApiAxios(
    {
      url: '/books/api/loanedbooks/?all',
      method: 'GET',
    },
    { manual: true },
  );
  let today = new Date();

  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  useEffect(() => {
    refetch();
  }, [auth, refetch]);

  const set = Array.from(new Set(bookList));
  console.log(set);

  if (!auth.birthdate) {
    return <div></div>;
  } else {
    return (
      <>
        <div className="flex justify-center">
          {bookList
            ?.filter((item, index) => {
              return (
                bookList.findIndex((item2, j) => {
                  return item.ISBN === item2.ISBN;
                }) === index
              );
            })
            .sort((book1, book2) => book2.count_loans - book1.count_loans)
            .slice(0, 3)
            .map(
              (book) =>
                book?.birthdate &&
                auth.birthdate &&
                Math.floor(
                  (date.slice(0, 4) - auth.birthdate.slice(0, 4)) / 10,
                ) *
                  10 ===
                  Math.floor(
                    (date.slice(0, 4) - book.birthdate.slice(0, 4)) / 10,
                  ) *
                    10 && (
                  <div
                    key={book.book_num}
                    className="h-[370px] w-[400px] flex justify-center items-center"
                  >
                    <RecommendedBooksSummary book={book} />
                  </div>
                ),
            )}
        </div>
      </>
    );
  }
}

export default RecommendedBooks;
