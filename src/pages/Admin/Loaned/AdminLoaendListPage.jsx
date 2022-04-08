import { useState } from 'react';
import AdminLoanedBookList from '../AdminLoanedBookList';
import AdminLoanedGameList from './AdminLoaendGameList';

function AdminLoanedListPage() {
  const [showBookLoaned, setShowBookLoaned] = useState(true);
  const [showGameLoaned, setShowGameLoaned] = useState(false);
  return (
    <div>
      <div className="ml-32">
        <button
          className={`${
            showBookLoaned ? 'bg-indigo-600 text-white' : 'text-gray-800'
          }
          bottom-20 border border-indigo-600 px-5 mr-2 py-2.5
          text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-600 hover:text-white
  
        `}
          onClick={() => setShowBookLoaned(true)}
          onClickCapture={() => {
            setShowGameLoaned(false);
          }}
        >
          도서 대출
        </button>

        <button
          className={`${
            showGameLoaned ? 'bg-indigo-600 text-white' : 'text-gray-800'
          }
          bottom-20 border border-indigo-600 px-5 mr-2 py-2.5
          text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-600 hover:text-white
        `}
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
