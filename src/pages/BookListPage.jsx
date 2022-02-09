import BookList from 'components/books/BookList';
import { useNavigate } from 'react-router-dom';

function BookListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>도서 목록</h2>
      <BookList />

      <button onClick={() => navigate('/')}>새 포스팅 쓰기</button>
    </div>
  );
}

export default BookListPage;
