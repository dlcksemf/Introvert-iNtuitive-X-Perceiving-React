import { useAuth } from 'base/hooks/Authcontext';
import GameDetailPage from 'components/Game/GameDetailPage';
import GameListPage from 'components/Game/GameListPage';
import NotFound from 'components/parts/NotFound';
import { Route, Routes } from 'react-router-dom';

function PageGameRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/gamelist/*" element={<GameListPage />} />
        <Route path="/:gameId/" element={<GameDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default PageGameRouter;
