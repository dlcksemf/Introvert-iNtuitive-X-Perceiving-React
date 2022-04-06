import { useAuth } from 'base/hooks/Authcontext';
import GameDetailPage from 'components/Game/GameDetailPage';
import GameListPage from 'components/Game/GameListPage';
import Footer from 'components/parts/Footer';
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
      <div className="h-[60px]"></div>

      {!auth?.is_staff && (
        <div className="fixed bottom-0 w-full z-50">
          <hr />
          <Footer />
        </div>
      )}
    </>
  );
}

export default PageGameRouter;
