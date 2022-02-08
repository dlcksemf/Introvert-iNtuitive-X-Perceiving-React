import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({ access, refresh, email, is_staff }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        email,
        is_staff,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  return [auth, setAuth, login, logout];
}

export default useAuth;
