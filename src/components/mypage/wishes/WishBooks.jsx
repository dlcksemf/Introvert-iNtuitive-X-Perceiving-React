import { useNavigate } from 'react-router-dom';
import React from 'react';
import { STATELIST } from 'Constants';

function WishBooks({ book }) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <tr>
        <div
          className="cursor-pointer hover:text-red-400"
          onClick={() => {
            navigate(`/books/${book.book_num}/`);
          }}
        >
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
            {book.title}
          </th>
        </div>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {book.writer}
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {STATELIST.books[book.state]}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
          {book.return_due_date}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default WishBooks;
