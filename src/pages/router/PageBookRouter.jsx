import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import BookApplicationFormPage from 'pages/BookApplicationFormPage';
import BookApplicationPage from 'pages/BookApplicationPage';
import BookDetailPage from 'pages/BookDetailPage';
import BookListPage from 'pages/BookListPage';
import NotFound from 'components/parts/NotFound';
import BookApplicationSearch from 'components/books/application/BookApplicationSearch';
import Footer from 'components/parts/Footer';

function PageBookRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/booklist/*" element={<BookListPage />} />
        <Route path="/:book_num/" element={<BookDetailPage />} />
        <Route path="/application/" element={<BookApplicationPage />} />

        <Route
          path="/application/new/"
          element={
            auth.isLoggedIn ? (
              <BookApplicationFormPage />
            ) : (
              <Navigate to="/accounts/login/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="h-[60px]"></div>

      {!auth?.is_staff && (
        <div className="fixed bottom-0 w-full z-50">
          <hr />
          <Footer />
        </div>
      )}
    </>
  );
}

export default PageBookRouter;
