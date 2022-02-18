import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

function AdminTopNav() {
  const [, logout] = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();

  return (
    <div className="w-fit h-full bg-gray-200 text-center">
      <hr />
      <h2
        onClick={() => navigate('/admin/user/')}
        className="mt-3 mb-3 hover:bg-gray-600 cursor-pointer"
      >
        회원관리
      </h2>
      <h2
        onClick={() => navigate('/admin/booklist/')}
        className="mt-3 mb-3 hover:bg-gray-600 cursor-pointer"
      >
        도서관리
      </h2>
      <h2
        onClick={() => navigate('/admin/loanedbook/')}
        className="mt-3 mb-3 hover:bg-gray-600 cursor-pointer"
      >
        대출도서관리
      </h2>
      <h2
        onClick={() => navigate('/admin/application/')}
        className="mt-3 mb-3 hover:bg-gray-600 cursor-pointer"
      >
        신청도서관리
      </h2>
      <hr />

      <button
        class="snap-center bg-blue-500 font-bold rounded-lg text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default AdminTopNav;
