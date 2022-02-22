import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect, useState } from 'react';

function AdminLoanedBookState() {
  const [auth] = useAuth();
  const [{ data: stateList }, refetch] = useApiAxios(
    {
      url: 'books/api/loanedbooks/',
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
    if (stateList?.return_state === 'L') {
      if (stateList?.return_due_date < date) {
        return 'red';
      }
      return 'green';
    } else if (stateList?.return_state === 'R') {
      return 'yellow';
    } else if (stateList?.return_state === 'P') {
      return 'blue';
    } else {
      return 'gray';
    }
  });

  return (
    <React.Fragment>
      {stateList?.map((color) => (
        <div>{color?.return_state}</div>
      ))}
    </React.Fragment>
  );
}
export default AdminLoanedBookState;
