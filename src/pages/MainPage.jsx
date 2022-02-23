import HeavyReader from 'components/main/HeavyReader';
import Main from 'components/main/Main';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';
import { HashLink, NavHashLink } from 'react-router-hash-link';

function MainPage() {
  return (
    <div className="">
      <ul>
        <li>
          <HashLink smooth to={'/#top'}>
            Top
          </HashLink>
        </li>
        <li>
          <NavHashLink
            smooth
            activeStyle={{ fontWeight: 'bold' }}
            to={'/#main'}
          >
            Main
          </NavHashLink>
        </li>
        <li>
          <HashLink smooth to={'/#rank'}>
            Rank
          </HashLink>
        </li>
        <li>
          <HashLink smooth to={'/#top-reader'}>
            top-reader
          </HashLink>
        </li>
      </ul>

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
