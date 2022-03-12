// hamburger 바 만들기 & 스타일링 (중앙정렬)

import { useAuth } from 'base/hooks/Authcontext';
import { NavLink, useNavigate } from 'react-router-dom';
import name from 'components/parts/image/name2.png';
import search from 'components/parts/image/search3.png';

function TopNav() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleGoToMainPage = () => {
    if (!auth.is_staff) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="border-t-4 border-blue-700 text-gray-600 border-double body-font sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-80">
      <div className="mx-2 flex px-5 py-2 flex-col md:flex-row items-center">
        <div className="basis-1/3 grow-0 shrink-0 text-gray-900 md:mb-0"></div>

        <div
          className={`flex justify-center basis-1/3 grow-0 shrink-0 md:ml-auto md:mr-auto ${
            auth.is_staff ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <div
            className="text-md text-primary-600 text-bold text-center"
            onClick={handleGoToMainPage}
          >
            <img src={name} alt="EUCLID BOOKS" />
          </div>
        </div>

        <div className="grow-0 shrink-0 flex justify-end items-center basis-1/3 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
          {!auth.isLoggedIn && (
            <NavLink
              className="font-semibold select-none mr-3 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              type="button"
              to="/accounts/login/"
            >
              로그인
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <div className="text-sm font-bold mr-3 select-none flex">
              <div className="mt-1">
                {auth.is_staff
                  ? `관리자님 환영합니다`
                  : `${auth.username ? auth.username : 'NoNamer'}님 환영합니다`}
              </div>
              <button
                className="ml-3 transition duration-500 ease-in-out hover:scale-125"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="내정보 가기"
                onClick={() => {
                  navigate('/accounts/mypage/');
                }}
              >
                <svg
                  style={{ width: 30 + 'px', height: 30 + 'px' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-slate-600 justify-end"
                    d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                  />
                </svg>
              </button>
            </div>
          )}
          <img
            src={search}
            alt="검색"
            style={{ width: 25 + 'px', height: 25 + 'px' }}
            className="flex justify-end transition duration-500 ease-in-out hover:scale-125"
          />
        </div>
      </div>
    </header>
  );
}

export default TopNav;
