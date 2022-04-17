import { useNavigate } from 'react-router-dom';

function LoginToast() {
  const navigate = useNavigate();

  return (
    <div>
      <div>로그인 창으로 이동하시겠습니까?</div>

      <button
        onClick={() => {
          navigate('/accounts/login/');
        }}
      >
        <h1 className="ml-24 text-sky-600 font-bold">이동하기</h1>
      </button>
    </div>
  );
}

export default LoginToast;
