import MainNavigation from 'components/parts/MainNavigation';
import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <MainNavigation />
      <header class="grid grid-cols-8 text-center text-xl">
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
            navigate(`/`);
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
      <div class="grid grid-rows-4 grid-flow-col gap-4 text-center">
        <div class="row-span-4">
          <Top5 />
        </div>
        <div class="col-span-2 m-auto">
          <HeavyReader />
        </div>
        <div class="row-span-2 col-span-2 m-auto">
          <NewBook />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
