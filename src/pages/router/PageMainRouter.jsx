import MyPage from 'components/mypage/MyPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import UserInfoForm from 'components/mypage/UserInfoForm';

import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import NotFound from 'components/parts/NotFound';
import GuidePage from 'pages/GuidePage';
import MainPage from 'pages/MainPage';
import Footer from 'components/parts/Footer';

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
        <div className="absolute bottom-0 w-full">
          <hr />
          <Footer />
        </div>
      )}
    </>
  );
}

export default PageMainRouter;
