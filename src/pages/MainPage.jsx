import HeavyReader from 'components/main/HeavyReader';
import NewBook from 'components/main/NewBook';
import RecommendedBooks from 'components/main/RecommendedBooks';
import Top5 from 'components/main/Top5';
import Euclid from 'components/parts/image/Euclid.jpg';
import { useState } from 'react';

function MainPage() {
  const [showHeavyReader, setShowHeavyReader] = useState(false);
  const [showNewBook, setShowNewBook] = useState(false);
  const [showRecommendedBooks, setShowRecommendedBooks] = useState(false);
  const [showTop5, setShowTop5] = useState(false);

  return (
    <div className="h-[733px]">
      <img
        src={Euclid}
        alt="유클리드"
        className="max-w-full h-auto relative bottom-[95px]"
      />
      <div className="border-2 border-gray-500 max-w-full h-[574px] relative bottom-[668px] bg-rose-300 opacity-20" />
      <div className="border-2 border-gray-500 mx-[200px] h-[400px] relative bottom-[900px] bg-white shadow-md">
        <span className="flex justify-start">
          <button
            className={`${
              showTop5 ? 'text-yellow-200' : 'text-white hover:text-yellow-200'
            }
            py-8 px-[113px] relative bottom-[90px] bg-sky-600 font-extrabold`}
            onClick={() => setShowTop5(true)}
            onClickCapture={() => {
              setShowHeavyReader(false);
              setShowNewBook(false);
              setShowRecommendedBooks(false);
            }}
          >
            인기도서
          </button>
          <button
            className={`${
              showNewBook
                ? 'text-yellow-200'
                : 'text-white hover:text-yellow-200'
            }
            mt-5 px-[113px] relative bottom-[90px] bg-sky-700 font-extrabold`}
            onClick={() => setShowNewBook(true)}
            onClickCapture={() => {
              setShowHeavyReader(false);
              setShowTop5(false);
              setShowRecommendedBooks(false);
            }}
          >
            신간도서
          </button>
          <button
            className={`${
              showHeavyReader
                ? 'text-yellow-200'
                : 'text-white hover:text-yellow-200'
            }
            mt-9 px-[113px] relative bottom-[90px] bg-sky-800 font-extrabold`}
            onClick={() => setShowHeavyReader(true)}
            onClickCapture={() => {
              setShowNewBook(false);
              setShowTop5(false);
              setShowRecommendedBooks(false);
            }}
          >
            다독왕
          </button>
          <button
            className={`${
              showRecommendedBooks
                ? 'text-yellow-200'
                : 'text-white hover:text-yellow-200'
            }
            mt-12 px-[113px] relative bottom-[90px] bg-sky-900 font-extrabold`}
            onClick={() => setShowRecommendedBooks(true)}
            onClickCapture={() => {
              setShowNewBook(false);
              setShowTop5(false);
              setShowHeavyReader(false);
            }}
          >
            추천도서
          </button>
        </span>
        <div className="relative bottom-8 left-24">{showTop5 && <Top5 />}</div>
        <div className="relative bottom-[35px] left-7">
          {showNewBook && <NewBook />}
        </div>
        <div className="relative bottom-[65px] flex justify-end">
          {showHeavyReader && <HeavyReader />}
        </div>
        <div className="relative bottom-[80px] right-[180px]">
          {showRecommendedBooks && <RecommendedBooks />}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
