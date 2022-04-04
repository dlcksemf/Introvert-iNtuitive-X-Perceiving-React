import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect, useState } from 'react';

function AdminLoanedGameState() {
  const [auth] = useAuth();
  const [{ data: stateList }, refetch] = useApiAxios(
    {
      url: 'game/api/loanedgame/',
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

  const [color, setColor] = useState(() => {
    if (stateList.return_state === 'L') {
      if (new Date(stateList.return_due_time) < today) {
        return 'red';
      }
      return 'green';
    } else if (stateList.return_state === 'R') {
      return 'blue';
    }
  });

  return (
    <React.Fragment>
      {stateList?.map((color) => (
        <div key={color.toString}>{color?.return_state}</div>
      ))}
    </React.Fragment>
  );
}

export default AdminLoanedGameState;
