import { Link, useLocation } from 'react-router-dom';

function UserInfo({ info }) {
  let location = useLocation();

  return (
    <div>
      <h2>UserInfo</h2>
      {info?.username}

      <hr />
      <Link
        to="/accounts/modal/userinfo/"
        state={{ backgroundLocation: location }}
      >
        정보 수정하기
      </Link>
    </div>
  );
}

export default UserInfo;
