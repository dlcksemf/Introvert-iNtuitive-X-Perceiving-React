import BookList from 'components/books/BookList';
import Toggle from 'components/parts/Toggle';
import { useNavigate } from 'react-router-dom';

function BookListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="flex justify-center inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-lg leading-tight uppercase rounded ease-in-out">
        도서 목록
      </h2>
      <BookList />
    </div>
  );
}

export default BookListPage;
