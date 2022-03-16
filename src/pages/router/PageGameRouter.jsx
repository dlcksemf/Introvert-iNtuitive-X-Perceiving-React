import { useAuth } from 'base/hooks/Authcontext';
import GameListPage from 'components/Game/GameListPage';
import { Route, Routes } from 'react-router-dom';

function PageGameRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/gamelist/*" element={<GameListPage />} />
      </Routes>
    </>
  );
}

export default PageGameRouter;
