import { useNavigate } from 'react-router-dom';

function LoginToast({ closeToast, toastProps }) {
  const navigate = useNavigate();

  return (
    <div>
      <div>📘로그인 창으로 이동하시겠습니까?</div>

      <button
        onClick={() => {
          navigate('/accounts/login/');
        }}
      >
        이동하기!!
      </button>
    </div>
  );
}

export default LoginToast;
