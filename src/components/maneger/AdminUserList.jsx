import { useApiAxios } from 'base/api/base';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import { useAuth } from 'base/hooks/Authcontext';

function AdminUserList({ user }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ loading: deleteLoading, error: deleteError }, deleteUser] =
    useApiAxios(
      {
        url: `/accounts/api/users/${user.email}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    window.confirm('유저를 삭제하시겠습니까?');
    deleteUser().then(() => {
      navigate('/admin/user/');
    });
  };

  return (
    <div>
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}

      <div className="flex">
        <div className="flex g-gray-100 m-2 mt-3 mb-3 w-fit">
          {user && (
            <>
              {
                <svg
                  className="ml-2 mr-3"
                  style={{ width: 30 + 'px', height: 30 + 'px' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-slate-600"
                    d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                  />
                </svg>
              }
              {user?.username} {user?.email}
            </>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="bg-primary-300 h-fit  m-2 mt-3 mb-3"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default AdminUserList;
