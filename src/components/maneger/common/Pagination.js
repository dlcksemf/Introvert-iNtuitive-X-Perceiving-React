import React from 'react';

const Pagination = ({ userPage, totalUsers, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / userPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="!#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
