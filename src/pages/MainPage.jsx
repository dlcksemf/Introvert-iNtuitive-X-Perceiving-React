import MainNavigation from 'components/parts/MainNavigation';
import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import RecommendedBooks from 'components/main/RecommendedBooks';

function MainPage() {
  return (
    <div>
      <MainNavigation />
      <div className="grid grid-row-1 grid-flow-col gap-5 text-center">
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
