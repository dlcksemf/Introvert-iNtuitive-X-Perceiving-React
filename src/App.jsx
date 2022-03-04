import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

import TopNav from 'components/parts/TopNav';

import PageBookRouter from 'pages/router/PageBookRouter';
import PageAccountsRouter from 'pages/router/PageAccountsRouter';
import PageAdminRouter from 'pages/router/PageAdminRouter';
import MainPage from 'pages/MainPage';
import Footer from 'components/parts/Footer';
import NotFound from 'components/parts/NotFound';
import ErrorForbidden from 'components/parts/ErrorForbidden';
import Back from 'components/parts/Back';
import LoginPage from 'pages/LoginPage';

function App() {
  const [auth] = useAuth();

  return (
    <div className="relative min-h-screen">
      <TopNav />

      <div className="app">
        <Routes>
          {auth?.is_staff && (
            <Route path="/" element={<Navigate to="/admin/" />} />
          )}
          {!auth?.is_staff && <Route path="/" element={<MainPage />} />}
          <Route path="/accounts/*" element={<PageAccountsRouter />} />
          <Route path="/books/*" element={<PageBookRouter />} />
          <Route
            path="/admin/*"
            element={auth.is_staff ? <PageAdminRouter /> : <ErrorForbidden />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div className="relative">
          <div className="fixed bottom-20 right-16">
            <Back className="sticky top-0" />
          </div>
        </div>
      </div>
      <div className="h-[60px]"></div>

      {!auth?.is_staff && (
        <div className="absolute bottom-0 w-full">
          <hr />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
