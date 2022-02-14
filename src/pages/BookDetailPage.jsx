import BookDetail from 'components/books/BookDetail';
import Toggle from 'components/parts/Toggle';
import { useParams } from 'react-router-dom';

function BookDetailPage() {
  const { book_num } = useParams();

  return (
    <div>
      <h2 className="text-center">도서#{book_num} 상세보기</h2>
      <div className="flex">
        <Toggle />
      </div>
      <BookDetail book_num={book_num} />
    </div>
  );
}

export default BookDetailPage;
