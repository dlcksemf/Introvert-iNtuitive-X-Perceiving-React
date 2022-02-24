import main from 'pages/img/main.jpg';

function Main() {
  return (
    <>
      <img
        src={main}
        alt="메인 책장"
        className="w-screen h-screen rounded inline"
      />
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
                  도서 더 보기
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
