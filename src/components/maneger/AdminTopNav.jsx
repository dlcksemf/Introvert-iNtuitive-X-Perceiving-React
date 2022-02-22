import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

function AdminTopNav() {
  const navigate = useNavigate();

  const [, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      className="w-40 h-screen text-center bg-primary-200
                backdrop-filter backdrop-blur-lg bg-opacity-30
                border-r border-gray-200"
    >
      <div className="px-4">
        <div className="h-16">
          <ul className="text-gray-900">
            <li
              onClick={() => navigate('/admin/user/')}
              className="flex space-x-2 mt-10 cursor-pointer hover:text-primary-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-semibold">회원관리</span>
            </li>
            <li
              onClick={() => navigate('/admin/booklist/')}
              className="flex space-x-2 mt-10 cursor-pointer hover:text-primary-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold">도서관리</span>
            </li>
            <li
              onClick={() => navigate('/admin/loanedbook/')}
              className="flex space-x-2 mt-10 cursor-pointer hover:text-primary-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              <span className="font-semibold">대출관리</span>
            </li>
            <li
              onClick={() => navigate('/admin/application/')}
              className="flex space-x-2 mt-10 cursor-pointer hover:text-primary-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-semibold">신청 관리</span>
            </li>

            <button
              onClick={handleLogout}
              className="px-5 mt-10 bg-primary-400 rounded-full py-1.5 text-white"
            >
              로그아웃
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminTopNav;
