import { useApiAxios } from 'base/api/base';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'base/hooks/Authcontext';

function AdminUserList({ user, reload }) {
  const [, setUserDelete] = useState(false);
  const [auth] = useAuth();
  const [{}, deleteUser, refresh] = useApiAxios(
    {
      url: `/accounts/api/users/${user.user_id}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('유저를 삭제하시겠습니까?')) {
      handleOkButton();
      alert('삭제되었습니다.');
      deleteUser().then(() => {
        reload();
      });
    } else {
      handleCancleButton();
      alert('취소되었습니다.');
    }
    setUserDelete(true);
  };

  const handleOkButton = () => {
    setUserDelete(true);
  };

  const handleCancleButton = () => {
    setUserDelete(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <React.Fragment>
      <td className="flex items-center"></td>
      <td className="">
        <div className="flex items-center cursor-pointer">
          <p className="text-sm leading-none text-gray-600">{user.username}</p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {user.email}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {user.created_at.slice(0, 10)}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {user.count_loans}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <button
            onClick={handleDelete}
            className={`cursor-pointer py-3 px-3 text-xs focus:outline-none leading-none text-red-700 bg-red-100 rounded`}
          >
            삭제
          </button>
        </div>
      </td>
    </React.Fragment>
  );
}

export default AdminUserList;
