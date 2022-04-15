import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import ApplicationsList from './applications/ApplicationsList';
import LoanedBooksList from './loanedBooks/LoanedBooksList';
import WishBooksList from './wishes/WishBooksList';
import LoanedGameList from './loanedGame/LoanedGameList';
import UserInfo from './UserInfo';
import { useReload } from 'base/hooks/ReloadContext';
import ReadingStatus from './ReadingStatus';
import { Link, useLocation } from 'react-router-dom';

function MyPage() {
  const [showWish, setShowWish] = useState(false);
  const [showLoaned, setShowLoaned] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [auth] = useAuth();
  const [, setReload] = useReload();
  let location = useLocation();
  const [{ data }, getUserInfo] = useApiAxios(
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
  }, [getUserInfo, setReload]);

  return (
    <>
      <div className="border-b-4 border-sky-600 w-[1140px] relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          내 정보 관리
        </h2>
      </div>
      <div className="h-full w-[700px] pb-20">
        <div className="flex relative left-[130px]">
          <div className="relative top-[90px]">
            <UserInfo info={data} />
          </div>
          <div className="relative left-[80px] top-[30px]">
            <ReadingStatus />
          </div>
        </div>

        <section
          className="border-2 border-gray-100 shadow-xl w-[1135px]
        relative top-[50px] left-[200px]"
        >
          <div className="flex relative left-[20px] relative top-[20px]">
            <button
              className={`${
                showLoaned
                  ? 'bg-indigo-600 text-white border-none px-4 py-2.5'
                  : 'text-gray-800'
              }
                          bottom-20 border-2 border-indigo-600 px-3 mr-2
                          
                          text-sm shadow-sm font-semibold tracking-wider rounded-md hover:bg-indigo-400 
                         `}
              onClick={() => setShowLoaned(true)}
              onClickCapture={() => {
                setShowWish(false);
                setShowGame(false);
                setShowApplication(false);
              }}
            >
              대출 도서
            </button>

            <button
              className={`${
                showGame
                  ? 'bg-indigo-500 text-white border-none px-5 py-2.5'
                  : 'text-gray-800'
              }
                                    bottom-20 border-2 border-indigo-500 px-3 mr-2
                          text-sm shadow-sm font-semibold tracking-wider rounded-md hover:bg-indigo-400
                        `}
              onClick={() => setShowGame(true)}
              onClickCapture={() => {
                setShowWish(false);
                setShowLoaned(false);
                setShowApplication(false);
              }}
            >
              게임 대여
            </button>

            <button
              className={`${
                showWish
                  ? 'bg-indigo-500 text-white border-none px-5 py-2.5'
                  : 'text-gray-800'
              }
                          px-4 py-2 border-2 border-indigo-500
                          text-sm shadow-sm font-semibold tracking-wider rounded-md hover:bg-indigo-400
                       `}
              onClick={() => setShowWish(true)}
              onClickCapture={() => {
                setShowLoaned(false);
                setShowGame(false);
                setShowApplication(false);
              }}
            >
              찜 도서
            </button>
            <button
              className={`${
                showApplication
                  ? 'bg-indigo-500 text-white border-none px-5 py-2.5'
                  : 'text-gray-800'
              }
                        px-4 py-2 border-2 border-indigo-500 relative left-[10px]
                        text-sm shadow-sm font-semibold tracking-wider rounded-md hover:bg-indigo-400
                     `}
              onClick={() => setShowApplication(true)}
              onClickCapture={() => {
                setShowLoaned(false);
                setShowGame(false);
                setShowWish(false);
              }}
            >
              신청 도서
            </button>
            <Link
              to={
                showLoaned
                  ? `/accounts/modal/loanedbooks/`
                  : showWish
                  ? `/accounts/modal/wishes/`
                  : showGame
                  ? `/accounts/modal/loanedgame/`
                  : `/accounts/modal/applications/`
              }
              state={{ backgroundLocation: location }}
            >
              <button
                className="bg-indigo-500 text-white border-none px-5 py-2.5 relative left-[610px]
                text-sm shadow-sm font-semibold tracking-wider rounded-md hover:bg-indigo-400"
              >
                전체 내역 보기
              </button>
            </Link>
          </div>

          <div className="mt-10">
            {showLoaned && (
              <LoanedBooksList loanedBookList={data?.loanedbooks_set} />
            )}
            {showGame && (
              <LoanedGameList loanedGameList={data?.loanedgame_set} />
            )}
            {showWish && <WishBooksList wishBookList={data?.wishes_set} />}
            {showApplication && (
              <ApplicationsList applicationList={data?.applications_set} />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default MyPage;
