import HeavyReader from 'components/main/HeavyReader';
import Main from 'components/main/Main';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';
import MainNavigation from 'components/parts/MainNavigation';

function MainPage() {
  return (
    <div className="">
      <MainNavigation />

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
    </div>
  );
}

export default MainPage;
