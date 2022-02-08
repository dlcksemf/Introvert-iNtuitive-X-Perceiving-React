import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';

function MainPage() {
  return (
    <div>
      <h2>Main Page</h2>
      <Top5 />
      <HeavyReader />
      <NewBook />
    </div>
  );
}

export default MainPage;
