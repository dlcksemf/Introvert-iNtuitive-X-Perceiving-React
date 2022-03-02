import { useNavigate } from 'react-router-dom';
import page from './image/Notfound1.PNG';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <img className="w-5/6" src={page} alt="404 페이지" />
        </div>
        <div className="flex justify-center mb-5">
          <button
            className="h-16 w-44 text-white bg-indigo-600 border-0 hover:bg-indigo-700 
        rounded-full text-xl justify-center m-3"
            onClick={() => navigate(-1)}
          >
            뒤로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
