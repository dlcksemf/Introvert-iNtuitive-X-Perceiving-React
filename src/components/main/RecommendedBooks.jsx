import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { RecommendedBooksSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';
import recommended from 'components/parts/image/recommended.png';
import loginplz from 'components/parts/image/loginplz.png';
import { useNavigate } from 'react-router-dom';

function RecommendedBooks() {
  const [auth] = useAuth();
  const navigate = useNavigate();
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

  if (auth.isLoggedIn && !auth.birthdate) {
    return (
      <div>
        <button
          onClick={() => {
            navigate(`/accounts/mypage/`);
          }}
        >
          <img
            src={recommended}
            alt="생년월일 등록하고 추천도서 받으러가기"
            className="h-48 relative left-[470px] top-[100px] select-none
            animate__animated animate__pulse animate__infinite"
          />
        </button>
      </div>
    );
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
          {!auth.isLoggedIn && (
            <div>
              <button
                onClick={() => {
                  navigate(`/accounts/login/`);
                }}
              >
                <img
                  src={loginplz}
                  alt="생년월일 등록하고 추천도서 받으러가기"
                  className="h-40 relative left-[200px] top-[120px] select-none
            animate__animated animate__pulse animate__infinite"
                />
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default RecommendedBooks;
