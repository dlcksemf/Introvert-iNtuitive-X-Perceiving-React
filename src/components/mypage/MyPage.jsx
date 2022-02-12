import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect } from 'react';
import ApplicationsList from './applications/ApplicationsList';
import LoanedBooksList from './loanedBooks/LoanedBooksList';
import WishBooksList from './wishes/WishBooksList';
import UserInfo from './UserInfo';
import { useReload } from 'base/hooks/ReloadContext';

function MyPage() {
  const [auth] = useAuth();
  const [reload, setReload] = useReload();
  const [{ data, loading, error, errorMessages }, getUserInfo] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.email}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    getUserInfo()
      .then()
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getUserInfo()
      .then(() => {
        setReload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  return (
    <>
      <UserInfo info={data} />

      <div>
        <h2>Applications List</h2>
        <ApplicationsList applicationList={data?.applications_set} />
      </div>

      <div>
        <h2>Loaned Book List</h2>
        <LoanedBooksList loanedBookList={data?.loanedbooks_set} />
      </div>

      <div>
        <h2>Wish Book List</h2>
        <WishBooksList wishBookList={data?.wishes_set} />
      </div>
    </>
  );
}

export default MyPage;
