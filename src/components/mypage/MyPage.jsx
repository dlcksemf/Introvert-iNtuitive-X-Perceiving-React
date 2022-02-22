import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import ApplicationsList from './applications/ApplicationsList';
import LoanedBooksList from './loanedBooks/LoanedBooksList';
import WishBooksList from './wishes/WishBooksList';
import UserInfo from './UserInfo';
import { useReload } from 'base/hooks/ReloadContext';

function MyPage() {
  const [showWish, setShowWish] = useState(false);
  const [showLoaned, setShowLoaned] = useState(true);
  const [auth] = useAuth();
  const [reload, setReload] = useReload();
  const [{ data, loading, error, errorMessages }, getUserInfo] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.user_id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

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
    <div className="ml-24 mt-10">
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <div class="w-full md:w-3/12 md:mx-2">
            <div class="bg-white p-3 border-t-4 border-blue-400">
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                <UserInfo info={data} />
              </h1>
            </div>
            <div>
              <ApplicationsList applicationList={data?.applications_set} />
            </div>

            <div class="my-4"></div>

            <div class="bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"></div>
              <div class="grid grid-cols-3"></div>
            </div>
          </div>

          <div class="w-full md:w-9/12 mx-2 h-64">
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"></div>
              <div class="text-gray-700">
                <div class=" text-sm">
                  <div class="">
                    <div>
                      {showLoaned && (
                        <div>
                          <LoanedBooksList
                            loanedBookList={data?.loanedbooks_set}
                          />
                        </div>
                      )}
                      {showWish && (
                        <div>
                          <WishBooksList wishBookList={data?.wishes_set} />
                        </div>
                      )}

                      <div className="ml-10">
                        <button
                          class="bg-yellow-300 px-3 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full hover:shadow-2xl hover:bg-yellow-400"
                          onClick={() => setShowLoaned(true)}
                          onClickCapture={() => setShowWish(false)}
                        >
                          Loaned Book
                        </button>
                        <button
                          class="bg-indigo-300 px-3 py-2 text-sm shadow-sm font-medium tracking-wider  text-indigo-600 rounded-full hover:shadow-2xl hover:bg-indigo-400 ml-3"
                          onClick={() => setShowWish(true)}
                          onClickCapture={() => setShowLoaned(false)}
                        >
                          Wish Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
