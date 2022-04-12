import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import NotFound from 'components/parts/NotFound';
import GuidePage from 'pages/GuidePage';
import MainPage from 'pages/MainPage';

function PageMainRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        {!auth?.is_staff && <Route path="/" element={<MainPage />} />}
        <Route path="/guidepage/" element={<GuidePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="h-[60px]"></div>

      {!auth?.is_staff && (
        <div className="fixed bottom-0 w-full z-50">
          <hr />
        </div>
      )}
    </>
  );
}

export default PageMainRouter;
