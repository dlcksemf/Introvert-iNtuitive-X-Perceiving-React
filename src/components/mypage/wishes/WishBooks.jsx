import { useNavigate } from 'react-router-dom';

function WishBooks({ book }) {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div
        className="cursor-pointer hover:text-red-400"
        onClick={() => {
          navigate(`/books/${book.book_num}/`);
        }}
      >
        {book.title}
      </div>

      {book.state}
    </div>
  );
}
export default WishBooks;
