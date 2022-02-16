import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import { useEffect } from 'react';
import AdminUserList from './AdminUserList';
import React, { useState } from 'react';
import Pagination from './common/Pagination';
import AdminTopNav from './AdminTopNav';
import { useNavigate } from 'react-router-dom';
// import Pagination from 'react-js-pagination';

function AdminUser() {
  const navigate = useNavigate();

  const [{ data: userdata, loading, error }, refresh] = useApiAxios(
    {
      url: 'accounts/api/users/',
      methid: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refresh();
  }, []);

  // const [page, setPage] = useState({});
  // const [currentPage, setCureentPate] = useState(1);
  // const [userPerPage, setUserPerPage] = useState(10);

  // const { length: count } = userdata;
  // if (count === 0) return <p>등록된 유저가 없습니다.</p>;

  // const handlePageChange = (page) => {
  //   setPage({ ...page, currentPage: page });
  // };

  return (
    <div className="flex">
      <AdminTopNav />
      <div className="flex justify-center">
        <div className="ml-20 ">유저목록</div>

        {/* <p> 총 유저 : {count} 명</p> */}

        <div className="mt-5 mb-2">
          {loading && '유저 목록을 가져오는 중입니다.'}
          {error && '목록을 가져오는 중 에러가 발생했습니다.'}
          <div>
            {userdata &&
              userdata.map((user, index) => <AdminUserList user={user} />)}
          </div>

          <>
            <Pagination prevPageText={'<'} nextPageText={'>'} />
          </>
        </div>
      </div>
      {/* <DebugStates userdata={userdata} loading={loading} error={error} /> */}
    </div>
  );
}

export default AdminUser;
