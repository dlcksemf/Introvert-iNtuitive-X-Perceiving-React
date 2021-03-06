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
    <div>
      <div>
        <Carousel
          stopAutoPlayOnHover={true}
          navButtonsAlwaysInvisible={true}
          indicators={false}
          swipeable={true}
          swipeScrollTolerance={10}
        >
          {bookList
            ?.sort((book1, book2) => book2.count_loans - book1.count_loans)
            .slice(0, 5)
            .map((book) => (
              <div key={book.book_num}>
                <Top5Summary book={book} />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Top5;
