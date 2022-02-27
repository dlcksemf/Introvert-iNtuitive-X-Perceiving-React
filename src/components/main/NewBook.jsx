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
    <div className="flex justify-center">
      <div className="h-[800px] w-[1100px]">
        <Carousel
          stopAutoPlayOnHover={true}
          fullHeightHover={false}
          indicators={false}
          navButtonsProps={{
            style: {
              backgroundColor: 'cornflowerblue',
              borderRadius: 100,
            },
          }}
        >
          {bookList?.slice(0, 3).map((book) => (
            <div
              key={book.book_num}
              className="h-[600px] w-[1000px] flex justify-center items-center"
            >
              <NewBookSummary book={book} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default NewBook;
