import book from 'pages/img/book.jpg';
import ggumdori from 'components/parts/image/ggumdori.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <span className="flex justify-center">
        <img
          src={book}
          alt="메인 책장"
          className="w-screen h-screen rounded inline opacity-95"
        />
        <button
          onClick={() => {
            navigate(`/books/bookList/`);
          }}
          className="absolute transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
        >
          <img
            src={ggumdori}
            alt="꿈돌이"
            className="mt-64 ml-8 object-contain h-48 w-96 stroke-2 stroke-black"
          />
          <div
            className="text-white bg-indigo-600 border-0 py-4 ml-28 mr-24
              focus:outline-none hover:bg-indigo-700 rounded-full text-lg"
          >
            도서 목록 보러 가기
          </div>
        </button>
      </span>
    </div>
  );
}
export default Main;
