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
    <header class="text-gray-600 body-font sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-20 border-b border-gray-200">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          {is_main && (
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
          )}
        </div>

        <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <span class="ml-3 text-xl text-primary-700">EULCIDSOFT</span>
        </a>

        <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <div class="inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
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
    </header>
  );
}

export default TopNav;
