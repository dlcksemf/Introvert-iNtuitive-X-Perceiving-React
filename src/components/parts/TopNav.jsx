import { useAuth } from 'base/hooks/Authcontext';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from 'components/parts/image/Logo.png';
import out_black from 'components/parts/image/out_black.png';
import out_white from 'components/parts/image/out_white.png';

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
  const [auth, , , logout] = useAuth();

  const handleGoToMainPage = () => {
    if (!auth.is_staff) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const { y } = useScroll();

  if (y > 0.5) {
    return (
      <div className="fixed w-full body-font top-0 z-10 h-68">
        <div className="flex-1 flex flex-col">
          <nav className="px-10 flex justify-between bg-white h-16 shadow-md">
            <ul className="flex items-center">
              <div className="text-md text-primary-600 text-bold text-center">
                <img src={Logo} alt="EUCLID BOOKS" className="h-[50px]" />
              </div>
            </ul>

            <header className="flex justify-between items-center text-xl">
              <div
                className="mr-16 cursor-pointer font-bold "
                onClick={() => {
                  navigate(`/admin/loaned/`);
                }}
              >
                대출관리
              </div>
              <div
                className="mr-16 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/booklist/`);
                }}
              >
                도서관리
              </div>
              <div
                className="mr-16 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/gamelist/`);
                }}
              >
                보드게임관리
              </div>
              <div
                className="mr-16 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/user/`);
                }}
              >
                회원관리
              </div>
              <div
                className="mr-16 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/review/`);
                }}
              >
                리뷰관리
              </div>
              <div
                className=" cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/application/`);
                }}
              >
                신청관리
              </div>
            </header>

            <ul className="flex items-center">
              <li>
                {!auth.isLoggedIn && (
                  <>
                    <NavLink
                      className="font-semibold select-none mr-6 hover:text-sky-600"
                      type="button"
                      to="/accounts/login/"
                    >
                      로그인
                    </NavLink>
                    <NavLink
                      className="font-semibold select-none mr-6 hover:text-sky-600"
                      type="button"
                      to="/accounts/signup/"
                    >
                      회원가입
                    </NavLink>
                  </>
                )}
                {auth.isLoggedIn && (
                  <div className="text-sm font-bold mr-3 select-none flex text-black">
                    <div className="mt-1.5">
                      {auth.is_staff
                        ? `관리자님 환영합니다`
                        : `${
                            auth.username ? auth.username : 'NoNamer'
                          }님 환영합니다`}
                    </div>
                    <button>
                      <div
                        title="로그아웃"
                        className="ml-0.5 px-[10px] py-[1px]"
                        onClick={handleLogout}
                      >
                        <img className="w-6 h-6" src={out_black} alt="logout" />
                      </div>
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="fixed w-full body-font top-0 z-10 h-68">
          <div className="flex-1 flex flex-col">
            <nav className="px-10 flex justify-between h-[55px] border-b-2 bg-sky-600">
              <ul className="flex items-center">
                <li className="relative top-[58px] w-[250px]">
                  <div
                    className={`flex justify-center basis-1/3 grow-0 shrink-0 md:ml-auto md:mr-auto ${
                      auth.is_staff ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div
                      className="text-md text-primary-600 text-bold text-center"
                      onClick={handleGoToMainPage}
                    >
                      <img src={Logo} alt="EUCLID BOOKS" className="h-[50px]" />
                    </div>
                  </div>
                </li>
              </ul>

              <ul className="flex items-center">
                <li>
                  {!auth.isLoggedIn && (
                    <>
                      <NavLink
                        className="font-semibold select-none mr-6 hover:text-yellow-200 text-white"
                        type="button"
                        to="/accounts/login/"
                      >
                        로그인
                      </NavLink>
                      <NavLink
                        className="font-semibold select-none mr-6 hover:text-yellow-200 text-white"
                        type="button"
                        to="/accounts/signup/"
                      >
                        회원가입
                      </NavLink>
                    </>
                  )}
                  {auth.isLoggedIn && (
                    <div className="text-sm font-bold mr-3 select-none flex text-white">
                      <div className="mt-1.5">
                        {auth.is_staff
                          ? `관리자님 환영합니다`
                          : `${
                              auth.username ? auth.username : 'NoNamer'
                            }님 환영합니다`}
                      </div>
                      <button>
                        <div
                          title="로그아웃"
                          className="ml-0.5 px-[10px] py-[1px]"
                          onClick={handleLogout}
                        >
                          <img
                            className="w-6 h-6"
                            src={out_white}
                            alt="logout"
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
            <header className="flex justify-between mt-6 text-xl">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div
                className="col-start-4 cursor-pointer font-bold "
                onClick={() => {
                  navigate(`/admin/loaned/`);
                }}
              >
                대출관리
              </div>
              <div
                className="col-start-5 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/booklist/`);
                }}
              >
                도서관리
              </div>
              <div
                className="col-start-6 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/gamelist/`);
                }}
              >
                보드게임관리
              </div>
              <div
                className="col-start-7 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/user/`);
                }}
              >
                회원관리
              </div>
              <div
                className="col-start-8 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/review/`);
                }}
              >
                리뷰관리
              </div>
              <div
                className="col-start-9 cursor-pointer font-bold"
                onClick={() => {
                  navigate(`/admin/application/`);
                }}
              >
                신청관리
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </header>
          </div>
        </div>
      </>
    );
  }
}

export default TopNav;
