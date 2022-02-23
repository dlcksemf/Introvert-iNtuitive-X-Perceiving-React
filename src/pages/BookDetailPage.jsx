import BookDetail from 'components/books/BookDetail';
import { useParams } from 'react-router-dom';

function BookDetailPage() {
  const { book_num } = useParams();

  return (
    <div>
      <BookDetail book_num={book_num} />
    </div>
  );
}

export default BookDetailPage;
