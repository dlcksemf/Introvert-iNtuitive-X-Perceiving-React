// hamburger 바 만들기 & 스타일링 (중앙정렬)

import { useAuth } from 'base/hooks/Authcontext';
import { useNavigate } from 'react-router-dom';
import PopOver from './Popover';

function TopNav({ is_main = true }) {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleGoToMainPage = () => {
    if (!auth.is_staff) {
      navigate('/books/booklist');
    }
  };

  const handleOpenNavigator = () => {
    console.log('This is mainPage');
  };

  return (
    <>
      <div className="bg-gray-200 py-2 px-10 h-[64px] w-full">
        <div className="flex justify-items-center justify-between items-center h-full mx-10">
          <div>
            {is_main ? (
              <svg
                style={{ width: 30 + 'px', height: 30 + 'px' }}
                viewBox="0 0 24 24"
                onClick={handleOpenNavigator}
              >
                <path
                  className="fill-slate-600"
                  d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
                />
              </svg>
            ) : (
              <div className="w-10 h-full py-2" />
            )}
          </div>

          <div>
            <div
              className="inline-block text-blue-500 text-bold py-2 cursor-pointer"
              onClick={handleGoToMainPage}
            >
              EUCLID SOFT
            </div>
          </div>

          <div>
            <div className="flex items-center h-full">
              {auth.isLoggedIn && (
                <div className="text-[16px] font-bold mr-5 py-2 inline-block">
                  {auth.is_staff
                    ? `WELCOME STAFF`
                    : `WELCOME ${auth.username ? auth.username : 'NoNamer'}`}
                </div>
              )}
              <PopOver />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;
