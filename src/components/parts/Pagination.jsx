import React from 'react';

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const bookNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    bookNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {bookNumbers.map((number) => (
            <li key={number}>
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
