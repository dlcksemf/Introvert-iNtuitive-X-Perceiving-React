import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import Badge from 'designMaterials/Badge';
import ConfirmationModal from 'designMaterials/ConfirmationModal';
import { useState } from 'react';

function LoanedBooks({ book }) {
  const { book_name: bookInfo } = book;
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [auth] = useAuth();
  const [, setReload] = useReload();

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const overdueDate = Math.floor(
    (Date.parse(date) - Date.parse(book.return_due_date)) / (1000 * 3600 * 24),
  );

  const [color, setColor] = useState(() => {
    if (book.return_state === 'L') {
      if (book.return_due_date < date) {
        return 'red';
      }
      return 'green';
    } else if (book.return_state === 'A') {
      return 'yellow';
    } else if (book.return_state === 'R') {
      return 'blue';
    } else {
      return 'gray';
    }
  });

  const [{ loading, error, errorMessages }, updateState] = useApiAxios(
    {
      url: `/books/api/newloanedbooks/${bookInfo.book_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    setShowSubmitModal(true);
  };

  const handleOkButton = () => {
    updateState({ data: { return_state: 'A' } })
      .then(() => {
        setShowSubmitModal(false);
        setReload(true);
        setColor('yellow');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancleButton = () => {
    setShowSubmitModal(false);
  };

  return (
    <div>
      {bookInfo.title}

      <Badge color={color}>
        {book.return_state === 'L' &&
          (book.return_due_date < date ? overdueDate : book.return_due_date)}
        {book.return_state === 'A' && '반납 신청..'}
      </Badge>

      {book.return_state === 'L' && (
        <button onClick={handleClickSubmitButton}>반납 신청</button>
      )}

      {showSubmitModal && (
        <ConfirmationModal
          handleOkButton={handleOkButton}
          handleCancleButton={handleCancleButton}
        >
          반납 신청 하시겠습니까?
        </ConfirmationModal>
      )}
    </div>
  );
}
export default LoanedBooks;
