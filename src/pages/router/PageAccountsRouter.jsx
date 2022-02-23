import MyPage from 'components/mypage/MyPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import UserInfoForm from 'components/mypage/UserInfoForm';

import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageModal from 'pages/PageModal';
import PageUserInfoModal from 'pages/PageUserInfoModal';

function PageAccountsRouter() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignupPage />} />
        <Route path="/mypage/" element={<MyPage />} />
        <Route path="/edit/" element={<UserInfoForm />} />
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
