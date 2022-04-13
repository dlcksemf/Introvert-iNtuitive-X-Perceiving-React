import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

import TopNav from 'components/parts/TopNav';

import PageBookRouter from 'pages/router/PageBookRouter';
import PageAccountsRouter from 'pages/router/PageAccountsRouter';
import PageAdminRouter from 'pages/router/PageAdminRouter';
import PageGameRouter from 'pages/router/PageGameRouter';
import NotFound from 'components/parts/NotFound';
import ErrorForbidden from 'components/parts/ErrorForbidden';
import SecondNav from 'components/parts/SecondNav';
import MainNavigation from 'components/parts/MainNavigation';
import PageMainRouter from 'pages/router/PageMainRouter';
import Footer from 'components/parts/Footer';
// import Test from 'Test';

function App() {
  const [auth] = useAuth();

  return (
    <div>
      {/* <MainNavigation /> */}
      <div className="relative min-h-fit">
        {auth.is_staff ? <TopNav /> : <SecondNav />}

        <div className="app mt-44">
          <Routes>
            {auth?.is_staff && (
              <Route path="/" element={<Navigate to="/admin/" />} />
            )}
            <Route path="/*" element={<PageMainRouter />} />
            <Route path="/accounts/*" element={<PageAccountsRouter />} />
            <Route path="/books/*" element={<PageBookRouter />} />
            <Route path="/game/*" element={<PageGameRouter />} />
            <Route
              path="/admin/*"
              element={auth.is_staff ? <PageAdminRouter /> : <ErrorForbidden />}
            />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/test/" element={<Test />} /> */}
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
