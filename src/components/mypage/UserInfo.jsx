function UserInfo({ info }) {
  return (
    <div>
      <h2>UserInfo</h2>
      {info?.username}

      <hr />
      <button>정보 수정하기</button>
    </div>
  );
}

export default UserInfo;
