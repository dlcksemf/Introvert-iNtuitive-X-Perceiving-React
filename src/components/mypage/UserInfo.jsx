function UserInfo({ info }) {
  return (
    <div>
      <h2>UserInfo</h2>
      {info?.username}
    </div>
  );
}

export default UserInfo;
