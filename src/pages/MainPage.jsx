import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import RecommendedBooks from 'components/main/RecommendedBooks';
import Euclid from 'components/parts/image/Euclid.png';

function MainPage() {
  return (
    <div>
      <img
        src={Euclid}
        alt="유클리드"
        className="max-w-full h-auto relative bottom-[95px]"
      />
      <div className="border-2 border-gray-500 max-w-full h-[668px] relative bottom-[762px] bg-rose-300 opacity-20" />
      <div className="border-2 border-gray-500 mx-[200px] h-[500px] relative bottom-[1000px] bg-white shadow-md">
        <span className="flex justify-start">
          <button
            className="py-8 px-[113px] relative bottom-[90px] bg-sky-600 font-extrabold text-white
          hover:text-yellow-200"
          >
            인기도서
          </button>
          <button
            className="mt-5 px-[113px] relative bottom-[90px] bg-sky-700 font-extrabold text-white
          hover:text-yellow-200"
          >
            신간도서
          </button>
          <button
            className="mt-9 px-[113px] relative bottom-[90px] bg-sky-800 font-extrabold text-white
          hover:text-yellow-200"
          >
            다독왕
          </button>
          <button
            className="mt-12 px-[113px] relative bottom-[90px] bg-sky-900 font-extrabold text-white
          hover:text-yellow-200"
          >
            추천도서
          </button>
        </span>
        <div className="w-full">
          <Top5 />
        </div>
      </div>
      {/* <div className="grid grid-row-1 grid-flow-col ">
        <div className="w-full">
          <Top5 />
        </div>
        <div className="mt-16">
          <HeavyReader />
        </div>
      </div>
      <div className="grid grid-col-1 mb-28">
        <div className=" mx-28 m-auto">
          <NewBook />
        </div>
      </div>
      <div className="grid grid-col-1">
        <div className=" mx-28 m-auto">
          <RecommendedBooks />
        </div>
      </div> */}
    </div>
  );
}
export default MainPage;
