import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import RecommendedBooks from 'components/main/RecommendedBooks';
function MainPage() {
  return (
    <div>
      <div className="grid grid-row-1 grid-flow-col ">
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
      </div>
    </div>
  );
}
export default MainPage;
