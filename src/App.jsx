import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

import Test from 'Test';
import TopNav from 'components/parts/TopNav';

import PageBookRouter from 'pages/router/PageBookRouter';
import PageAccountsRouter from 'pages/router/PageAccountsRouter';
import PageAdminRouter from 'pages/router/PageAdminRouter';
import MainPage from 'pages/MainPage';

function App() {
  const [auth] = useAuth();

  return (
    <>
      <TopNav />
      <div className="app">
        <Routes>
          {auth?.is_staff && (
            <Route path="/" element={<Navigate to="/admin/" />} />
          )}
          {!auth?.is_staff && <Route path="/" element={<MainPage />} />}

          <Route path="/test/" element={<Test />} />

          <Route path="/accounts/*" element={<PageAccountsRouter />} />

          <Route path="/books/*" element={<PageBookRouter />} />

          {auth.is_staff && (
            <Route path="/admin/*" element={<PageAdminRouter />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
