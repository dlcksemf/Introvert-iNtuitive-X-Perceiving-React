import HeavyReader from 'components/main/HeavyReader';
import Main from 'components/main/Main';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';
import Footer from 'components/parts/Footer';
import MainNavigation from 'components/parts/MainNavigation';
import GuidePage from './GuidePage';

function MainPage() {
  return (
    <div className="">
      <MainNavigation />

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
  );
}

export default MainPage;
