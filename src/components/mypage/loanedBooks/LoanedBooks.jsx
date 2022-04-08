import { data } from 'autoprefixer';
import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import Badge from 'designMaterials/Badge';
import PageReturnBookModal from 'pages/PageReturnBookModal';
import PageReturnModal from 'pages/PageReturnGameModal';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoanedBooks({ book }) {
  const [, setBookReturn] = useState(false);
  const [auth] = useAuth();
  const [, setReload] = useReload();
  const navigate = useNavigate();
  const [showReturn, setShowReturn] = useState(false);

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [color, setColor] = useState(() => {
    if (book.return_state === 'L') {
      if (new Date(book.return_due_date) < new Date(date)) {
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

  const [, updateState] = useApiAxios(
    {
      url: `/books/api/loanedbooks/${book.loan_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );
  const [disable, setDisable] = useState();
  const handleExtendButton = () => {
    let return_extend_date = book.return_due_date;
    const strArr = return_extend_date.split('-');
    const date1 = new Date(strArr[0], strArr[1] - 1, strArr[2]);

    date1.setDate(date1.getDate() + 7);
    const date2 =
      date1.getFullYear() +
      '-' +
      (date1.getMonth() + 1) +
      '-' +
      date1.getDate();

    updateState({
      data: { return_state: 'E', return_due_date: date2 },
    })
      .then(() => {
        setDisable(true);
        setReload(true);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.replace('/accounts/mypage/');
  };

  return (
    <React.Fragment>
      <tr>
        <td
          className="cursor-pointer hover:text-red-400"
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        >
          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
            {book.title.length > 15
              ? book.title.slice(0, 15) + '...'
              : book.title}
          </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {book.writer}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          <Badge color={color}>
            {book.return_state === 'L' &&
              (new Date(book.return_due_date) < today
                ? Math.floor(
                    (Date.parse(today) - Date.parse(book.return_due_date)) /
                      (1000 * 3600 * 24),
                  ) + '일 연체'
                : book.return_due_date)}
            {book.return_state === 'E' &&
              (new Date(book.return_due_date) < today
                ? Math.floor(
                    (Date.parse(today) - Date.parse(book.return_due_date)) /
                      (1000 * 3600 * 24),
                  ) + '일 연체'
                : book.return_due_date)}
            {book.return_state === 'P' && '반납 신청..'}
            {book.return_state === 'R' && '반납 완료'}
          </Badge>
        </td>

        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {book.return_state === 'L' && (
            <button onClick={() => setShowReturn(true)}>반납 신청</button>
          )}
          {book.return_state === 'E' && (
            <button onClick={() => setShowReturn(true)}>반납 신청</button>
          )}

          {showReturn && (
            <PageReturnBookModal
              updateState={updateState}
              handleClose={() => setShowReturn(false)}
            />
          )}
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {book.return_state === 'L' && (
            <div>
              <button
                disabled={disable}
                onClick={() => {
                  handleExtendButton(true);
                }}
              >
                연장 신청
              </button>
            </div>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default LoanedBooks;
