import { useNavigate } from 'react-router-dom';
import AdminBookList from './AdminBookList';

function PageAdminBookList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center text-white">관리자 도서 목록</div>
      <div className="-m-2 text-center mt-2">
        <div className="p-2">
          <div
            class="inline-flex items-center bg-white leading-none text-black-600 rounded-full p-2 text-teal text-sm
          transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-105"
          >
            <span
              class="font-semibold cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-indigo-300 relative inline-block justify-center items-center"
              onClick={() => navigate('/admin/book/new/')}
            >
              <span className="relative text-white text-lg">새로운</span>
            </span>
            <span
              class="inline-flex px-2 select-none cursor-pointer"
              onClick={() => navigate('/admin/book/new/')}
            >
              도서 등록 📖
            </span>
          </div>
        </div>
      </div>
      <AdminBookList />
    </div>
  );
}

export default PageAdminBookList;
