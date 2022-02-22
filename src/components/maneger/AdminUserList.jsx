import { useApiAxios } from 'base/api/base';
import React, { useEffect } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import { useAuth } from 'base/hooks/Authcontext';

function AdminUserList({ user }) {
  const [auth] = useAuth();
  const [{ loading: deleteLoading, error: deleteError }, deleteUser, refresh] =
    useApiAxios(
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
    window.confirm('유저를 삭제하시겠습니까?');

    deleteUser().then(() => {
      window.location.replace('/admin/user/');
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <React.Fragment>
      <td className="flex items-center">
        {/* <div className="ml-5">
          <div className="bg-gray-200 rounded-sm w-5 h-5 flex justify-center items-center relative">
            <input
              type="checkbox"
              value={user.user_id}
              className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
            />
            <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
              <svg
                className="icon icon-tabler icon-tabler-check"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </div>
          </div>
        </div> */}
      </td>
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
            className={`cursor-default py-3 px-3 text-xs focus:outline-none leading-none text-red-700 bg-red-100 rounded`}
          >
            삭제
          </button>
        </div>
      </td>
    </React.Fragment>
    // <div>
    //   {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
    //   {deleteError &&
    //     `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}

    //   <div className="flex">
    //     <div className="flex g-gray-100 m-2 mt-3 mb-3 w-fit">
    //       {user && (
    //         <>
    //           {
    //             <svg
    //               className="ml-2 mr-3"
    //               style={{ width: 30 + 'px', height: 30 + 'px' }}
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 className="fill-slate-600"
    //                 d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
    //               />
    //             </svg>
    //           }
    //           {user?.username} {user?.email}
    //         </>
    //       )}
    //     </div>
    // <button
    //   onClick={handleDelete}
    //   className="bg-primary-300 h-fit  m-2 mt-3 mb-3"
    // >
    //   삭제
    // </button>
    //   </div>
    // </div>
  );
}

export default AdminUserList;
