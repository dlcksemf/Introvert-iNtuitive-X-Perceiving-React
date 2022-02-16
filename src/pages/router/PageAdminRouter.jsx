import { Routes, Route } from 'react-router-dom';

import AdminBookApplicationPage from 'pages/Admin/AdminBookApplicationPage';
import PageAdminBookDetail from 'pages/Admin/PageAdminBookDetail';
import PageAdminBookForm from 'pages/Admin/PageAdminBookForm';
import PageAdminBookList from 'pages/Admin/PageAdminBookList';
import AdminLoanedBookList from 'pages/Admin/AdminLoanedBookList';

function PageAdminRouter() {
  return (
    <Routes>
      <Route path="/booklist/" element={<PageAdminBookList />} />
      <Route path="/:postId/" element={<PageAdminBookDetail />} />
      <Route path="/book/new/" element={<PageAdminBookForm />} />
      <Route path="/book/:postId/edit/" element={<PageAdminBookForm />} />
      <Route path="/application/" element={<AdminBookApplicationPage />} />
      <Route path="/loanedbook/" element={<AdminLoanedBookList />} />
    </Routes>
  );
}

export default PageAdminRouter;
