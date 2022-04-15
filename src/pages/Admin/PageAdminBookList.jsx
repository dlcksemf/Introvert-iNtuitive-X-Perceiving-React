import { useNavigate } from 'react-router-dom';
import AdminBookList from './AdminBookList';

function PageAdminBookList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="">
        <div
          className="ml-40 items-center bg-indigo-400 leading-none rounded-full py-3 px-5 text-teal border border-indigo-400
            font-semibold cursor-pointer relative inline-block justify-center
            hover:bg-white  hover:border hover:border-indigo-400
            text-white text-lg hover:text-indigo-400
          "
        >
          <span onClick={() => navigate('/admin/book/new/')}>
            새로운 도서 등록 📖
          </span>
        </div>
      </div>
      <AdminBookList />
    </div>
  );
}

export default PageAdminBookList;
