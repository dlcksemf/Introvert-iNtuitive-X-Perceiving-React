import { useState } from 'react';
import AdminBookReview from './AdminBookReview';
import AdminGameReview from './AdminGameReview';

function AdminReviewPage() {
  const [showBookReview, setShowBookReview] = useState(true);
  const [showGameReview, setShowGameReview] = useState(false);

  return (
    <div>
      <div className="ml-48">
        <button
          className={`${
            showBookReview
              ? 'bg-amber-500 text-white border-none px-5 py-2.5'
              : 'text-gray-800'
          }
        bottom-20 border-2 border-amber-500 px-3 mr-2
        text-sm shadow-sm font-semibold tracking-wider rounded-full hover:shadow-2xl 
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
            showGameReview
              ? 'bg-amber-500 text-white border-none px-5 py-2.5'
              : 'text-gray-800'
          }
         bottom-20 border-2 border-amber-500 px-3 mr-2
         text-sm shadow-sm font-semibold tracking-wider rounded-full hover:shadow-2xl 
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
