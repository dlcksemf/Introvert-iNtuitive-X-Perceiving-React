import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import Top5 from 'components/main/Top5';

function MainPage() {
  return (
    <div>
      <div className="box-decoration-clone bg-gradient-to-r from-blue-200 to-indigo-200 ">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            {/* <div className="w-0 flex-1 flex items-center"> */}
            <div className="">
              <p className="ml-3 font-medium text-black truncate">
                <a
                  href="/books/bookList/"
                  className="bg-indigo-200 text-black px-2 font-bold hover:text-white"
                >
                  {' '}
                  도서 더 보기{' '}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen">
        <Top5 />
      </div>
      <div className="w-screen h-screen">
        <HeavyReader />
      </div>
      <div className="w-screen h-screen">
        <NewBook />
      </div>
    </div>
  );
}

export default MainPage;
