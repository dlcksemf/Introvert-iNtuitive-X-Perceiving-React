import { Routes, Route, Navigate } from 'react-router-dom';

import AdminBookApplicationPage from 'pages/Admin/AdminBookApplicationPage';
import PageAdminBookDetail from 'pages/Admin/PageAdminBookDetail';
import PageAdminBookForm from 'pages/Admin/PageAdminBookForm';
import PageAdminBookList from 'pages/Admin/PageAdminBookList';
import AdminLoanedBookList from 'pages/Admin/AdminLoanedBookList';
import AdminUserPage from 'pages/Admin/AdminUserPage';
import AdminTopNav from 'components/maneger/AdminTopNav';

function PageAdminRouter() {
  return (
    <div className="flex">
      <AdminTopNav />

      <div className="grow">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/user/" />} />

          <Route path="/user/" element={<AdminUserPage />} />
          <Route path="/booklist/" element={<PageAdminBookList />} />
          <Route path="/:postId/" element={<PageAdminBookDetail />} />
          <Route path="/book/new/" element={<PageAdminBookForm />} />
          <Route path="/book/:postId/edit/" element={<PageAdminBookForm />} />
          <Route path="/application/" element={<AdminBookApplicationPage />} />
          <Route path="/loanedbook/" element={<AdminLoanedBookList />} />
        </Routes>
      </div>
    </div>
  );
}

export default PageAdminRouter;
