import { useAuth } from 'base/hooks/Authcontext';
import GameDetailPage from 'components/Game/GameDetailPage';
import GameListPage from 'components/Game/GameListPage';
import { Route, Routes } from 'react-router-dom';

function PageGameRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/gamelist/*" element={<GameListPage />} />
        <Route path="/gamelist/:game_num" element={<GameDetailPage />} />
      </Routes>
    </>
  );
}

export default PageGameRouter;
