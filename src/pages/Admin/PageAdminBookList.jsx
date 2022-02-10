import { useNavigate } from 'react-router-dom';
import AdminBookList from './AdminBookList';

function PageAdminBookList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center text-white">관리자 도서 목록</div>
      <div className="-m-2 text-center mt-2">
        <div className="p-2">
          <div className="inline-flex items-center bg-white leading-none text-black-600 rounded-full p-2 shadow text-teal text-sm">
            <span
              className="inline-flex bg-blue-600 text-white rounded-full h-6 px-3 justify-center items-center cursor-pointer"
              onClick={() => navigate('/newbookform/')}
            >
              생성
            </span>
          </div>
        </div>
      </div>
      <AdminBookList />
    </div>
  );
}

export default PageAdminBookList;
