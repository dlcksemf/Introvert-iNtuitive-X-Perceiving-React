import { useNavigate } from 'react-router-dom';

function BookToast({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="select-none cursor-default text-left">
        {children}이 완료되었습니다.
      </div>

      <div className="text-left">
        <button
          onClick={() => {
            navigate('/accounts/mypage/');
          }}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          마이페이지에서 확인
        </button>
      </div>
    </div>
  );
}

export default BookToast;
