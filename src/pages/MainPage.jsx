import HeavyReader from 'components/main/HeavyReader';
import Main from 'components/main/Main';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';
import MainNavigation from 'components/parts/MainNavigation';
import GuidePage from './GuidePage';
import left from 'components/parts/image/left.png';
import right from 'components/parts/image/right.png';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <MainNavigation />

      <div>
        <div className="sticky top-full flex justify-end">
          <button
            className="w-14 h-14 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={left} alt="뒤로가기" />
          </button>
          <button
            className="ml-5 w-14 h-14 cursor-pointer"
            onClick={() => navigate(1)}
          >
            <img src={right} alt="앞으로가기" />
          </button>
        </div>
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
