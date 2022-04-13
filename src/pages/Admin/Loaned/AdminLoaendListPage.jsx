import { useState } from 'react';
import AdminLoanedBookList from '../AdminLoanedBookList';
import AdminLoanedGameList from './AdminLoaendGameList';

function AdminLoanedListPage() {
  const [showBookLoaned, setShowBookLoaned] = useState(true);
  const [showGameLoaned, setShowGameLoaned] = useState(false);
  return (
    <div>
      <div className="ml-[150px]">
        <button
          className={`${
            showBookLoaned ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }
           border border-indigo-400 px-5 mr-2 py-2
          text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white
  
        `}
          onClick={() => setShowBookLoaned(true)}
          onClickCapture={() => {
            setShowGameLoaned(false);
          }}
        >
          도서
        </button>

        <button
          className={`${
            showGameLoaned ? 'bg-indigo-400 text-white' : 'text-gray-800'
          }
           border border-indigo-400 px-5 mr-2 py-2
          text-sm font-semibold tracking-wider rounded-full hover:bg-indigo-400 hover:text-white
        `}
          onClick={() => setShowGameLoaned(true)}
          onClickCapture={() => {
            setShowBookLoaned(false);
          }}
        >
          보드게임
        </button>
      </div>
      {showBookLoaned && <AdminLoanedBookList />}
      {showGameLoaned && <AdminLoanedGameList />}
    </div>
  );
}
export default AdminLoanedListPage;
