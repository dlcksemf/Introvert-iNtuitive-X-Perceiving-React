import { useState } from 'react';
import AdminBookReview from './AdminBookReview';
import AdminGameReview from './AdminGameReview';

function AdminReviewPage() {
  const [showBookReview, setShowBookReview] = useState(true);
  const [showGameReview, setShowGameReview] = useState(false);

  return (
    <div>
      <div className="ml-[150px]">
        <button
          className={`${
            showBookReview ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }
          bottom-20 border border-indigo-400 px-5 mr-2 py-2
          text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white
        `}
          onClick={() => setShowBookReview(true)}
          onClickCapture={() => {
            setShowGameReview(false);
          }}
        >
          도서 리뷰
        </button>

        <button
          className={`${
            showGameReview ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }
         bottom-20 border border-indigo-400  px-5 mr-2 py-2
         text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white 
         `}
          onClick={() => setShowGameReview(true)}
          onClickCapture={() => {
            setShowBookReview(false);
          }}
        >
          보드게임 리뷰
        </button>
      </div>
      {showBookReview && <AdminBookReview />}
      {showGameReview && <AdminGameReview />}
    </div>
  );
}
export default AdminReviewPage;
