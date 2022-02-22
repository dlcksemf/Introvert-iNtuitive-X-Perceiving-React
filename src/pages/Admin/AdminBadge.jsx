import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';

function AdminBadge({ children }) {
  const [auth] = useAuth();
  const [{ data: colorList, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/loanedbooks/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [color, setColor] = useState(() => {
    if (colorList.return_state === 'L') {
      if (colorList.return_due_date < date) {
        return 'red';
      }
      return 'green';
    } else if (colorList.return_state === 'P') {
      return 'yellow';
    } else if (colorList.return_state === 'R') {
      return 'blue';
    } else {
      return 'gray';
    }
  });
  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded h-6`}
    >
      {children}
    </span>
  );
}
export default AdminBadge;
