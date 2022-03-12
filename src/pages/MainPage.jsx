import MainNavigation from 'components/parts/MainNavigation';
import Top5 from 'components/main/Top5';
import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';

function MainPage() {
  return (
    <div>
      <MainNavigation />
      <header class="grid grid-cols-8 text-center">
        <div className="col-start-3 select-none">도서목록</div>
        <div className="col-start-4 select-none">도서신청</div>
        <div className="col-start-5 select-none">보드게임</div>
        <div className="col-start-6 select-none">이용안내</div>
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
