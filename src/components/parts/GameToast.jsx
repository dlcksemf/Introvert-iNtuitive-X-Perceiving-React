import { useNavigate } from 'react-router-dom';

function GameToast({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="select-none cursor-default">
        ✨ {children}가 완료되었습니다.
      </div>

      <div className="ml-6">
        <button
          onClick={() => {
            navigate('/accounts/mypage/');
          }}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline decoration-wavy
            transition duration-500 ease-in-out hover:scale-110 underline-offset-4"
        >
          마이페이지에서 확인하기!!
        </button>
      </div>
    </div>
  );
}
export default GameToast;
