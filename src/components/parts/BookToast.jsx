import { useNavigate } from 'react-router-dom';

function BookToast({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <div>✨{children}이 완료되었습니다.</div>

      <div>마이페이지로 이동하시겠습니까?</div>

      <button
        onClick={() => {
          navigate('/accounts/mypage/');
        }}
        className="bg-yellow-400"
      >
        이동하기!!
      </button>
    </div>
  );
}

export default BookToast;
