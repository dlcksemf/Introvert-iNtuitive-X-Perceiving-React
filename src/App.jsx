import TopNav from 'components/parts/TopNav';
import PageAdminBookDetail from 'pages/Admin/PageAdminBookDetail';
import PageAdminBookList from 'pages/Admin/PageAdminBookList';
import PageAdminBookForm from 'pages/Admin/PageAdminBookForm';
import BookApplicationFormPage from 'pages/BookApplicationFormPage';
import BookDetailPage from 'pages/BookDetailPage';
import BookListPage from 'pages/BookListPage';
import GuidePage from 'pages/GuidePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Test from 'Test';

function App() {
  return (
    <>
      <TopNav />
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/test/" />} />

          <Route path="/test/" element={<Test />} />
          <Route path="/accounts/login/" element={<LoginPage />} />
          <Route path="/accounts/signup/" element={<SignupPage />} />
          <Route path="/books/booklist" element={<BookListPage />} />
          <Route path="/books/:book_num/" element={<BookDetailPage />} />
          <Route
            path="/books/application/"
            element={<BookApplicationFormPage />}
          />
          <Route path="/manager/booklist/" element={<PageAdminBookList />} />
          <Route path="/manager/:postId/" element={<PageAdminBookDetail />} />
          <Route path="/newbookform/" element={<PageAdminBookForm />} />
          <Route
            path="/bookform/:postId/edit"
            element={<PageAdminBookForm />}
          />
          <Route path="/guide/" element={<GuidePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
