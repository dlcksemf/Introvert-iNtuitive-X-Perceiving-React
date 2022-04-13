import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { NewBookSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

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
    <div>
      <div>
        <Carousel
          stopAutoPlayOnHover={true}
          indicators={false}
          navButtonsAlwaysInvisible={true}
          swipeable={true}
          swipeScrollTolerance={10}
        >
          {bookList?.slice(0, 3).map((book) => (
            <div key={book.book_num}>
              <NewBookSummary book={book} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default NewBook;
