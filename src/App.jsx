import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

import TopNav from 'components/parts/TopNav';

import PageBookRouter from 'pages/router/PageBookRouter';
import PageAccountsRouter from 'pages/router/PageAccountsRouter';
import PageAdminRouter from 'pages/router/PageAdminRouter';
import PageGameRouter from 'pages/router/PageGameRouter';
import MainPage from 'pages/MainPage';
import Footer from 'components/parts/Footer';
import NotFound from 'components/parts/NotFound';
import ErrorForbidden from 'components/parts/ErrorForbidden';
import LoginPage from 'pages/LoginPage';
import SecondNav from 'components/parts/SecondNav';
import { DotsItem } from '@nivo/core';
import MainNavigation from 'components/parts/MainNavigation';
import GuidePage from 'pages/GuidePage';
// import Test from 'Test';

function App() {
  const [auth] = useAuth();

  return (
    <div>
      <MainNavigation />
      <div className="relative min-h-screen">
        {auth.is_staff ? <TopNav /> : <SecondNav />}

        <div className="app mt-56">
          <Routes>
            {auth?.is_staff && (
              <Route path="/" element={<Navigate to="/admin/" />} />
            )}
            {!auth?.is_staff && <Route path="/" element={<MainPage />} />}
            <Route path="/accounts/*" element={<PageAccountsRouter />} />
            <Route path="/books/*" element={<PageBookRouter />} />
            <Route path="/game/*" element={<PageGameRouter />} />
            <Route
              path="/admin/*"
              element={auth.is_staff ? <PageAdminRouter /> : <ErrorForbidden />}
            />
            <Route path="/guidepage/" element={<GuidePage />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/test/" element={<Test />} /> */}
          </Routes>
        </div>
        <div className="h-[60px]"></div>

        {!auth?.is_staff && (
          <div className="absolute bottom-0 w-full">
            <hr />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
