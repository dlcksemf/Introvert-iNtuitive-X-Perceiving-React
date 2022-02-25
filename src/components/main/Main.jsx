import main from 'pages/img/main.jpg';
import ggumdori from 'components/parts/image/ggumdori.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <span className="flex justify-center">
        <img
          src={main}
          alt="메인 책장"
          className="w-screen h-screen rounded inline opacity-95"
        />
        <button
          onClick={() => {
            navigate(`/books/bookList/`);
          }}
          className="absolute transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-90"
        >
          <img
            src={ggumdori}
            alt="꿈돌이"
            className="mt-64 ml-16 object-contain h-48 w-96"
          />
          <div
            className="text-white bg-indigo-500 border-0 py-4 ml-40 mr-24
              focus:outline-none hover:bg-indigo-600 rounded-full text-lg"
          >
            도서 목록 보러 가기
          </div>
        </button>
      </span>
    </div>
  );
}
export default Main;
