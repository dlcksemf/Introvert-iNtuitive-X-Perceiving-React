import { useNavigate } from 'react-router-dom';
import AdminGameList from './AdminGameList';

function AdminGameListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center text-white">관리자 게임 목록</div>

      <div className="text-center">
        <div
          class="inline-flex items-center bg-indigo-600 leading-none rounded-full py-3 px-5 text-teal
            font-semibold cursor-pointer relative inline-block justify-center items-center
            hover:bg-white  hover:border hover:border-indigo-600
            text-white text-lg hover:text-indigo-600
          "
        >
          <span
            onClick={() => navigate('/admin/game/new/')}
            className="relative "
          >
            새로운 게임 등록 🎮
          </span>
        </div>
      </div>

      <AdminGameList />
    </div>
  );
}
export default AdminGameListPage;
