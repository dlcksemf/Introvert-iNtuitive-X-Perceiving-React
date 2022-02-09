import TopNav from 'components/parts/TopNav';
import AdminBookApplicationPage from 'pages/AdminBookApplicationPage';
import BookApplicationFormPage from 'pages/BookApplicationFormPage';
import BookApplicationPage from 'pages/BookApplicationPage';
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

          <Route path="/books/application/" element={<BookApplicationPage />} />
          <Route
            path="/books/application/new/"
            element={<BookApplicationFormPage />}
          />

          <Route path="/guide/" element={<GuidePage />} />

          <Route
            path="/admin/bookapplication/"
            element={<AdminBookApplicationPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
