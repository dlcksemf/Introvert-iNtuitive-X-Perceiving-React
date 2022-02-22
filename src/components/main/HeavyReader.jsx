import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useAuth } from 'base/hooks/Authcontext';
import { HeavyReaderSummary } from 'components/books/BookSummary';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

function HeavyReader() {
  const [auth] = useAuth();
  const [{ data: userList, loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/users/?all',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <h3>♥ 다독왕 ♥</h3>
      <Carousel
        navButtonsAlwaysInvisible={true}
        activeIndicatorIconButtonProps={false}
        indicatorIconButtonProps={{
          style: {
            padding: '10px', // 1
            color: '#ffffff', // 3
          },
        }}
      >
        {userList
          ?.sort((user1, user2) => user2.count_loans - user1.count_loans)
          .slice(0, 1)
          .map((book) => (
            <HeavyReaderSummary book={book} key={book.count_loans} />
          ))}
      </Carousel>
    </div>
  );
}

export default HeavyReader;
