import { useNavigate } from 'react-router-dom';
import React from 'react';
import { STATELIST } from 'Constants';
import { useApiAxios } from 'base/api/base';

function WishBooks({ book }) {
  const navigate = useNavigate();

  const [{}, deleteWish] = useApiAxios(
    {
      url: `/books/api/wishes/${book.wish_num}`,
      method: 'DELETE',
    },
    { manual: true },
  );

  const handleDelete = () => {
    deleteWish().then(() => {
      window.location.replace('/accounts/mypage/');
    });
  };

  return (
    <React.Fragment>
      <tr>
        <td
          className="cursor-pointer hover:font-bold"
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
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {book.writer.length > 15
            ? book.writer.slice(0, 15) + '...'
            : book.writer}
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {STATELIST.books[book.state]}
        </td>
        {book?.state !== 'A' && (
          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {book?.loaned_books[0]?.return_due_date}
          </td>
        )}
        <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3">
          <button
            className="border-2 border-red-600 text-black px-2 py-1 rounded-md text-xs font-medium hover:bg-red-600 transition duration-300"
            onClick={handleDelete}
          >
            찜 취소
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default WishBooks;
