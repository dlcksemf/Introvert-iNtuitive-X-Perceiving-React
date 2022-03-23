import { useAuth } from 'base/hooks/Authcontext';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import name from 'components/parts/image/euclidLibrary.png';
import search from 'components/parts/image/search.png';
import user from 'components/parts/image/user.png';

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = (e) => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
};

function TopNav() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleGoToMainPage = () => {
    if (!auth.is_staff) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  const { y } = useScroll();

  if (y > 80) {
    return (
      <div className="fixed w-full  body-font top-0 z-10">
        <header className=" text-gray-700 bg-white backdrop-filter backdrop-blur-sm bg-opacity-90">
          <div className="flex justify-between">
            <div>
              <img src={name} alt="EUCLID BOOKS" className="h-20" />
            </div>
            <div>
              <header className="mt-5 flex justify-between text-center text-xl">
                <div
                  className="mr-10 col-start-1 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold mb-5"
                  onClick={() => {
                    navigate(`/admin/loanedbook/`);
                  }}
                >
                  대출관리
                </div>
                <div
                  className="mr-10 col-start-2 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                  onClick={() => {
                    navigate(`/admin/booklist/`);
                  }}
                >
                  도서관리
                </div>
                <div
                  className="mr-10 col-start-3 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                  onClick={() => {
                    navigate(`/admin/gamelist/`);
                  }}
                >
                  보드게임 관리
                </div>
                <div
                  className="mr-10 col-start-4 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                  onClick={() => {
                    navigate(`/admin/user/`);
                  }}
                >
                  회원 관리
                </div>
                <div
                  className="mr-10 col-start-5 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                  onClick={() => {
                    navigate(`/admin/review/`);
                  }}
                >
                  리뷰 관리
                </div>
                <div
                  className="mr-10 col-start-6 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                  onClick={() => {
                    navigate(`/admin/application/`);
                  }}
                >
                  신청 관리
                </div>
              </header>
            </div>
            <div>
              <div className="grow-0 shrink-0 flex justify-end items-center basis-1/3 border-0 py-1 pt-5 pl-3 focus:outline-none rounded text-base mt-8 md:mt-0">
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
                        : `${
                            auth.username ? auth.username : 'NoNamer'
                          }님 환영합니다`}
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
                      <img src={user} alt="내정보" className="h-8 w-8" />
                    </button>
                  </div>
                )}
                <img
                  src={search}
                  alt="검색"
                  className="mr-12 h-9 w-9 flex justify-end transition duration-500 ease-in-out hover:scale-125"
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="fixed w-full body-font top-0 z-10 h-68">
        <header className=" text-gray-700 bg-white backdrop-filter backdrop-blur-sm bg-opacity-90">
          <div className="mx-2 flex px-7 pt-1 pb-4 flex-col md:flex-row items-center">
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
                <img src={name} alt="EUCLID BOOKS" className="h-32" />
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
                      : `${
                          auth.username ? auth.username : 'NoNamer'
                        }님 환영합니다`}
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
                    <img src={user} alt="내정보" className="h-8 w-8" />
                  </button>
                </div>
              )}
              <img
                src={search}
                alt="검색"
                className="h-9 w-9 flex justify-end transition duration-500 ease-in-out hover:scale-125"
              />
            </div>
          </div>
          <div>
            <header className="mt-5 flex justify-between text-center text-xl">
              <div></div>
              <div></div>
              <div
                className="col-start-1 select-none transition duration-500 ease-in-out cursor-pointer
          hover:text-blue-700 hover:font-extrabold mb-5"
                onClick={() => {
                  navigate(`/admin/loanedbook/`);
                }}
              >
                대출관리
              </div>
              <div
                className="col-start-2 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                onClick={() => {
                  navigate(`/admin/booklist/`);
                }}
              >
                도서관리
              </div>
              <div
                className="col-start-3 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                onClick={() => {
                  navigate(`/admin/gamelist/`);
                }}
              >
                보드게임 관리
              </div>
              <div
                className="col-start-4 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                onClick={() => {
                  navigate(`/admin/user/`);
                }}
              >
                회원 관리
              </div>
              <div
                className="col-start-5 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                onClick={() => {
                  navigate(`/admin/review/`);
                }}
              >
                리뷰 관리
              </div>
              <div
                className="col-start-6 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
                onClick={() => {
                  navigate(`/admin/application/`);
                }}
              >
                신청 관리
              </div>
              <div></div>
              <div></div>
            </header>
          </div>
        </header>
      </div>
    );
  }
}

export default TopNav;
