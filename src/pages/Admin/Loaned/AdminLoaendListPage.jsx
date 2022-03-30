import { useState } from 'react';
import AdminLoanedBookList from '../AdminLoanedBookList';
import AdminLoanedGameList from './AdminLoaendGameList';

function AdminLoanedListPage() {
  const [showBookLoaned, setShowBookLoaned] = useState(false);
  const [showGameLoaned, setShowGameLoaned] = useState(true);
  return (
    <div>
      <div className="ml-48">
        <button
          className={`${
            showBookLoaned
              ? 'bg-amber-500 text-white border-none px-5 py-2.5'
              : 'text-gray-800'
          }
        bottom-20 border-2 border-amber-500 px-3 mr-2
        text-sm shadow-sm font-semibold tracking-wider rounded-full hover:shadow-2xl 
        transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110`}
          onClick={() => setShowBookLoaned(true)}
          onClickCapture={() => {
            setShowGameLoaned(false);
          }}
        >
          도서 대출
        </button>

        <button
          className={`${
            showGameLoaned
              ? 'bg-amber-500 text-white border-none px-5 py-2.5'
              : 'text-gray-800'
          }
         bottom-20 border-2 border-amber-500 px-3 mr-2
         text-sm shadow-sm font-semibold tracking-wider rounded-full hover:shadow-2xl 
         transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110`}
          onClick={() => setShowGameLoaned(true)}
          onClickCapture={() => {
            setShowBookLoaned(false);
          }}
        >
          보드게임 대여
        </button>
      </div>
      {showBookLoaned && <AdminLoanedBookList />}
      {showGameLoaned && <AdminLoanedGameList />}
    </div>
  );
}
export default AdminLoanedListPage;
