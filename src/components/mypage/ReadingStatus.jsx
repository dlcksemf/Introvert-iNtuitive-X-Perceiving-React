import { ResponsiveCalendar } from '@nivo/calendar';
import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect } from 'react';

function ReadingStatus() {
  const [auth] = useAuth();

  const [{ data }, refetch] = useApiAxios(
    `/accounts/api/users/${auth.user_id}/`,
  );

  let today = new Date();

  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-[350px] w-[775px] select-none border-2 border-gray-100 shadow-xl">
      <h3 className="font-semibold text-xl text-gray-800 text-center select-none relative top-[10px]">
        나의 도서 통계
      </h3>
      {data && (
        <ResponsiveCalendar
          data={data.loaned_dates}
          from={date}
          to={date}
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      )}
    </div>
  );
}

export default ReadingStatus;
