import { useAuth } from 'base/hooks/Authcontext';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from 'components/parts/image/Logo.png';

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

function SecondNav() {
  const navigate = useNavigate();
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGoToMainPage = () => {
    if (!auth.is_staff) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };
  const { y } = useScroll();

  if (y > 0.5) {
    return (
      <div className="fixed w-full body-font top-0 z-10 h-68">
        <div class="flex-1 flex flex-col">
          <nav class="px-10 flex justify-between bg-white h-16 shadow-md">
            <ul class="flex items-center">
              <div
                className="text-md text-primary-600 text-bold text-center cursor-pointer"
                onClick={handleGoToMainPage}
              >
                <img src={Logo} alt="EUCLID BOOKS" className="h-[50px]" />
              </div>
            </ul>

            <ul class="flex items-center">
              <li>
                <header className="grid grid-cols-8 text-center text-xl mt-6">
                  <div
                    className="col-start-2 select-none transition duration-500 ease-in-out cursor-pointer
          font-bold mb-5 mr-5"
                    onClick={() => {
                      navigate(`/books/booklist/`);
                    }}
                  >
                    도서목록
                  </div>
                  <div
                    className="col-start-4 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                    onClick={() => {
                      navigate(`/books/application/`);
                    }}
                  >
                    신청도서
                  </div>
                  <div
                    className="col-start-6 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                    onClick={() => {
                      navigate(`/game/gamelist/`);
                    }}
                  >
                    보드게임
                  </div>
                  <div
                    className="col-start-8 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                    onClick={() => {
                      navigate(`/guidepage/`);
                    }}
                  >
                    이용안내
                  </div>
                </header>
              </li>
            </ul>

            <ul class="flex items-center">
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
                    <button
                      className="ml-6 hover:text-sky-600"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="내정보 가기"
                      onClick={() => {
                        navigate('/accounts/mypage/');
                      }}
                    >
                      <div className="border-2 border-black px-[25px] py-[5px] font-semibold">
                        내정보
                      </div>
                    </button>
                    <button>
                      <div
                        className="ml-0.5 border-2 border-black px-[10px] py-[1px]
                      font-bold text-xl hover:text-sky-600"
                        onClick={handleLogout}
                      >
                        ↪
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
          <div class="flex-1 flex flex-col">
            <nav class="px-10 flex justify-between h-[55px] border-b-2 bg-sky-600">
              <ul class="flex items-center">
                <li class="relative top-[58px] w-[250px]">
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

              <ul class="flex items-center">
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
                      <button
                        className="ml-6 hover:text-yellow-200"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="내정보 가기"
                        onClick={() => {
                          navigate('/accounts/mypage/');
                        }}
                      >
                        <div className="border-2 border-white px-[25px] py-[5px] font-semibold">
                          내정보
                        </div>
                      </button>
                      <button>
                        <div
                          className="ml-0.5 border-2 border-white px-[10px] py-[1px]
                      font-bold text-xl hover:text-yellow-200"
                          onClick={handleLogout}
                        >
                          ↪
                        </div>
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
            <header className="grid grid-cols-8 text-center text-xl mt-6 shadow-md">
              <div
                className="col-start-3 select-none transition duration-500 ease-in-out cursor-pointer
          font-bold mb-5"
                onClick={() => {
                  navigate(`/books/booklist/`);
                }}
              >
                도서목록
              </div>
              <div
                className="col-start-4 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                onClick={() => {
                  navigate(`/books/application/`);
                }}
              >
                신청도서
              </div>
              <div
                className="col-start-5 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                onClick={() => {
                  navigate(`/game/gamelist/`);
                }}
              >
                보드게임
              </div>
              <div
                className="col-start-6 select-none transition duration-500 ease-in-out cursor-pointer
              font-bold"
                onClick={() => {
                  navigate(`/guidepage/`);
                }}
              >
                이용안내
              </div>
            </header>
          </div>
        </div>
      </>
    );
  }
}

export default SecondNav;
