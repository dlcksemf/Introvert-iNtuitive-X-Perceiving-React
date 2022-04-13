import { useNavigate } from 'react-router-dom';
import AdminGameList from './AdminGameList';

function AdminGameListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="ml-40 items-center bg-indigo-400 leading-none rounded-full py-3 px-5 text-teal
          font-semibold cursor-pointer relative inline-block justify-center
          hover:bg-white  hover:border hover:border-indigo-400
          text-white text-lg hover:text-indigo-400
          "
      >
        <span
          onClick={() => navigate('/admin/game/new/')}
          className="relative "
        >
          새로운 게임 등록 🎮
        </span>
      </div>

      <AdminGameList />
    </div>
  );
}
export default AdminGameListPage;
