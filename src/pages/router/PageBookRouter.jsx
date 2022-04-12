import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import BookApplicationFormPage from 'pages/BookApplicationFormPage';
import BookApplicationPage from 'pages/BookApplicationPage';
import BookDetailPage from 'pages/BookDetailPage';
import BookListPage from 'pages/BookListPage';
import NotFound from 'components/parts/NotFound';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import RecommendedBooks from 'components/main/RecommendedBooks';
import Top5 from 'components/main/Top5';

function PageBookRouter() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/booklist/*" element={<BookListPage />} />
        <Route path="/:book_num/" element={<BookDetailPage />} />
        <Route path="/heavyreader/" element={<HeavyReader />} />
        <Route path="/newbook/" element={<NewBook />} />
        <Route path="/recommendedbooks/" element={<RecommendedBooks />} />
        <Route path="/top5/" element={<Top5 />} />
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
        </div>
      )}
    </>
  );
}

export default PageBookRouter;
