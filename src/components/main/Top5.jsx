import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { Top5Summary } from 'components/books/BookSummary';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

function Top5() {
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
        <h1 className="text-5xl font-semibold relative top-28 text-left ml-40 text-gray-700">
          인기도서
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="h-[700px] w-[750px]">
          <Carousel
            stopAutoPlayOnHover={true}
            fullHeightHover={false}
            indicators={false}
            NavButton={false}
            navButtonsAlwaysInvisible={true}
            swipeable={true}
            swipeScrollTolerance={10}
          >
            {bookList
              ?.sort((book1, book2) => book2.count_loans - book1.count_loans)
              .slice(0, 5)
              .map((book) => (
                <div
                  key={book.book_num}
                  className="ml-32 h-[600px] w-[650px] flex justify-center items-center"
                >
                  <Top5Summary book={book} />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Top5;
