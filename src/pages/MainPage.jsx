import MainNavigation from 'components/parts/MainNavigation';
import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import { useNavigate } from 'react-router-dom';
import RecommendedBooks from 'components/main/RecommendedBooks';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <MainNavigation />
      <header className="grid grid-cols-8 text-center text-xl">
        <div
          className="col-start-3 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
          onClick={() => {
            navigate(`/books/booklist/`);
          }}
        >
          도서목록
        </div>
        <div
          className="col-start-4 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
          onClick={() => {
            navigate(`/`);
          }}
        >
          도서신청
        </div>
        <div
          className="col-start-5 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
          onClick={() => {
            navigate(`/game/gamelist/`);
          }}
        >
          보드게임
        </div>
        <div
          className="col-start-6 select-none transition duration-500 ease-in-out hover:scale-125 cursor-pointer
          hover:text-blue-700 hover:font-extrabold"
          onClick={() => {
            navigate(`/`);
          }}
        >
          이용안내
        </div>
      </header>
      <div className="grid grid-row-1 grid-flow-col gap-1 text-center">
        <div>
          <Top5 />
        </div>
        <div className="m-auto">
          <HeavyReader />
        </div>
      </div>
      <div className="grid grid-col-1 m-auto">
        <div>
          <NewBook />
        </div>
      </div>
      <div className="grid grid-col-1 m-auto">
        <div>
          <RecommendedBooks />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
