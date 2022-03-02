import MyPage from 'components/mypage/MyPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import UserInfoForm from 'components/mypage/UserInfoForm';

import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageModal from 'pages/PageModal';
import PageUserInfoModal from 'pages/PageUserInfoModal';
import { useAuth } from 'base/hooks/Authcontext';
import NotFound from 'components/parts/NotFound';

function PageAccountsRouter() {
  let location = useLocation();
  let state = location.state;
  const [auth] = useAuth();

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignupPage />} />

        {auth.isLoggedIn && (
          <>
            <Route path="/mypage/" element={<MyPage />} />
            <Route path="/edit/" element={<UserInfoForm />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/modal/userinfo/" element={<PageUserInfoModal />} />
          <Route path="/modal/:modalType/" element={<PageModal />} />
        </Routes>
      )}
    </>
  );
}

export default PageAccountsRouter;
