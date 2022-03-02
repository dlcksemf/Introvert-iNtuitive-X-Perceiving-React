import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

import TopNav from 'components/parts/TopNav';

import PageBookRouter from 'pages/router/PageBookRouter';
import PageAccountsRouter from 'pages/router/PageAccountsRouter';
import PageAdminRouter from 'pages/router/PageAdminRouter';
import MainPage from 'pages/MainPage';
import Footer from 'components/parts/Footer';
import { useEffect } from 'react';
import NotFound from 'components/parts/NotFound';

function App() {
  const [auth] = useAuth();

  useEffect(() => {
    document.title = 'EUCLID BOOKS';
  }, []);

  return (
    <>
      <TopNav />

      <div className="app">
        <Routes>
          {auth?.is_staff && (
            <Route path="/" element={<Navigate to="/admin/" />} />
          )}
          {!auth?.is_staff && <Route path="/" element={<MainPage />} />}

          <Route path="/accounts/*" element={<PageAccountsRouter />} />

          <Route path="/books/*" element={<PageBookRouter />} />

          {auth.is_staff && (
            <Route path="/admin/*" element={<PageAdminRouter />} />
          )}
        </Routes>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!auth?.is_staff && (
        <>
          <hr />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
