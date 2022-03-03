import HeavyReader from 'components/main/HeavyReader';
import Main from 'components/main/Main';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';
import Back from 'components/parts/Back';
import MainNavigation from 'components/parts/MainNavigation';
import GuidePage from './GuidePage';

function MainPage() {
  return (
    <div>
      <MainNavigation />

      <div className="sticky top-3/4 z-50">
        <Back />
      </div>

      <div>
        <div className="ml-[80px] z-0">
          <section id="main">
            <Main />
          </section>

          <section id="rank">
            <Top5 />
          </section>

          <section id="top-reader">
            <HeavyReader />
          </section>

          <section id="new-book">
            <NewBook />
          </section>

          <section id="guide">
            <GuidePage />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
