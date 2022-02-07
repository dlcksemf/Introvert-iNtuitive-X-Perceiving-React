import { useApiAxios } from 'base/api/base';
import DebugStates from 'base/DebugStates';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = { email: '', password: '' };

function LoginForm() {
  const Navigate = useNavigate();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);
  const [{ loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues }).then((response) => {
      const { access, refresh, email } = response.data;
      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('email :', email);

      // 인증 후, 이동할 주소를 지정합니다.
      Navigate('/');
    });
  };

  return (
    <div className="my-3">
      <h2 className="my-3">로그인</h2>
      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        e-mail
        <input
          type="text"
          name="email"
          value={fieldValues.email}
          onChange={handleFieldChange}
          placeholder="e-mail를 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        password
        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="비밀번호를 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        <button>로그인</button>
      </form>

      <DebugStates fieldValues={fieldValues} loading={loading} error={error} />
    </div>
  );
}

export default LoginForm;
