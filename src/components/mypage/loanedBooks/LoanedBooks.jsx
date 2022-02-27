import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import Badge from 'designMaterials/Badge';
import React, { useState } from 'react';

function LoanedBooks({ book }) {
  const [, setBookReturn] = useState(false);
  const [auth] = useAuth();
  const [, setReload] = useReload();

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

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    if (window.confirm('반납하시겠습니까?')) {
      handleOkButton();
      alert('반납신청 되었습니다.');
    } else {
      handleCancleButton();
      alert('취소되었습니다.');
    }
    setBookReturn(true);
  };

  const handleOkButton = () => {
    updateState({ data: { return_state: 'P' } })
      .then(() => {
        setBookReturn(false);
        setReload(true);
        setColor('yellow');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancleButton = () => {
    setBookReturn(false);
  };

  return (
    <React.Fragment>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {book.title}
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {book.writer}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          <Badge color={color}>
            {book.return_state === 'L' &&
              (new Date(book.return_due_date) < new Date(date)
                ? Math.floor(
                    (Date.parse(date) - Date.parse(book.return_due_date)) /
                      (1000 * 3600 * 24),
                  ) + '일 연체'
                : book.return_due_date)}
            {book.return_state === 'P' && '반납 신청..'}
            {book.return_state === 'R' && '반납 됨'}
          </Badge>
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {book.return_state === 'L' && (
            <button onClick={handleClickSubmitButton}>반납 신청</button>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default LoanedBooks;
