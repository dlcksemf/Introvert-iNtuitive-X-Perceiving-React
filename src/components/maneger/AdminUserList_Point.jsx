import { useState } from 'react';

function AdminUserList_point({ book }) {
  const [sumoverdue, SetSumOverdue] = useState(null);

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const return_date = (
    <p>
      {book.return_state === 'L' &&
        (new Date(book.return_due_date) < today
          ? Math.floor(
              (Date.parse(today) - Date.parse(book.return_due_date)) /
                (1000 * 3600 * 24),
            )
          : book.return_due_date)}
    </p>
  );

  const overdue_date = (
    <div>{new Date(book.return_due_date) < today && return_date}</div>
  );

  // console.log(Array.isArray(overdue_date));
  const target = Object.values(overdue_date);

  const overdue_date_user = target.filter((target) => {
    if (book.username === book.username) {
      return { overdue_date };
    }
    return 'null';
  });

  console.log(overdue_date_user);

  // console.log(overdue_date_user);

  // 유저 이름이 같은 경우에 (book.username) overdue_date 을 더하기

  // 유저 이름이 같은 overdue_date의 개수

  return (
    <p>
      {book.username}
      <p>{overdue_date_user.result}</p>
    </p>
  );
}

export default AdminUserList_point;
