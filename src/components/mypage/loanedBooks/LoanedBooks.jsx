import DebugStates from 'base/DebugStates';
import Badge from 'designMaterials/Badge';
import { useState } from 'react';

function LoanedBooks({ book }) {
  const { book_name: bookInfo } = book;
  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [color] = useState(() => {
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

  const overdueDate = Math.floor(
    (Date.parse(date) - Date.parse(book.return_due_date)) / (1000 * 3600 * 24),
  );

  return (
    <div>
      {bookInfo.title}

      <Badge color={color}>
        {book.return_due_date < date ? overdueDate : book.return_due_date}
      </Badge>

      <DebugStates book={book} />
    </div>
  );
}
export default LoanedBooks;
