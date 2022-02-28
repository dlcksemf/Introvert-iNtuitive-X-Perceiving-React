import { useNavigate } from 'react-router-dom';
import AdminBookList from './AdminBookList';

function PageAdminBookList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center text-white">관리자 도서 목록</div>
      <div className="-m-2 text-center mt-2">
        <div className="p-2">
          <div class="inline-flex items-center bg-white leading-none text-black-600 rounded-full p-2 shadow text-teal text-sm">
            <span
              class="cursor-pointer inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
              onClick={() => navigate('/admin/book/new/')}
            >
              등록
            </span>
            <span class="inline-flex px-2">새로운 도서를 등록해주세요!📖</span>
          </div>
        </div>
      </div>
      <AdminBookList />
    </div>
  );
}

export default PageAdminBookList;
