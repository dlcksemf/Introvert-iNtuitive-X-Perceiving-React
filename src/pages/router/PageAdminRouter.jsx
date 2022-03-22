import { Routes, Route, Navigate } from 'react-router-dom';

import AdminBookApplicationPage from 'pages/Admin/AdminBookApplicationPage';
import PageAdminBookDetail from 'pages/Admin/PageAdminBookDetail';
import PageAdminBookForm from 'pages/Admin/PageAdminBookForm';
import PageAdminBookList from 'pages/Admin/PageAdminBookList';
import AdminLoanedBookList from 'pages/Admin/AdminLoanedBookList';
import AdminUserPage from 'pages/Admin/AdminUserPage';
import AdminTopNav from 'components/maneger/AdminTopNav';
import NotFound from 'components/parts/NotFound';
import ErrorForbidden from 'components/parts/ErrorForbidden';
import AdminGameListPage from 'pages/Admin/Game/AdminGameListPage';
import AdminGameDetailPage from 'pages/Admin/Game/AdminGameDetailPage';
import AdminGameFormPage from 'pages/Admin/Game/AdminGameFormPage';
import AdminReviewPage from 'pages/Admin/Review/AdminReviewPage';

function PageAdminRouter() {
  return (
    <div className="">
      <AdminTopNav />

      <div className="ml-[80px] z-0">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/loanedbook/" />} />

          <Route path="/user/" element={<AdminUserPage />} />
          <Route path="/booklist/" element={<PageAdminBookList />} />
          <Route path="/:postId/" element={<PageAdminBookDetail />} />
          <Route path="/book/new/" element={<PageAdminBookForm />} />
          <Route path="/book/:postId/edit/" element={<PageAdminBookForm />} />
          <Route path="/application/" element={<AdminBookApplicationPage />} />
          <Route path="/loanedbook/" element={<AdminLoanedBookList />} />
          <Route path="/gamelist/" element={<AdminGameListPage />} />
          <Route path="/gamelist/:gameId/" element={<AdminGameDetailPage />} />
          <Route path="/game/new/" element={<AdminGameFormPage />} />
          <Route path="/game/:gameId/edit/" element={<AdminGameFormPage />} />
          <Route path="/review/" element={<AdminReviewPage />} />
          <Route path="/403/" element={<ErrorForbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default PageAdminRouter;
