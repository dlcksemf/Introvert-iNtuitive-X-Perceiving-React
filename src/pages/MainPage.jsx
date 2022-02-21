import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';

function MainPage() {
  return (
    <div>
      <h2>Main Page</h2>
      <div className="flex justify-center">
        <a
          href="/books/bookList/"
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          도서 목록 가기
        </a>
      </div>
      <div className="w-screen h-screen">
        <Top5 />
      </div>
      <div className="w-screen h-screen">
        <HeavyReader />
      </div>
      <div className="w-screen h-screen">
        <NewBook />
      </div>
    </div>
  );
}

export default MainPage;
