import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { NewBookSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

function NewBook() {
  const [auth] = useAuth();
  const [{ data: bookList, loading, error }, refetch] = useApiAxios(
    {
      url: '/books/api/books/?all',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <Carousel
        fullHeightHover={false}
        navButtonsProps={{
          style: {
            backgroundColor: 'cornflowerblue',
            borderRadius: 0,
          },
        }}
        // IndicatorIcon={<Home />}
        indicatorIconButtonProps={{
          style: {
            padding: '10px', // 1
            color: 'cornflowerblue', // 3
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: 'black', // 2
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: '50px', // 5
            textAlign: 'center', // 4
          },
        }}
      >
        {bookList?.slice(0, 3).map((book) => (
          <div className="h-[600px] w-[900px] flex justify-center items-center">
            <NewBookSummary book={book} key={book.book_num} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NewBook;
