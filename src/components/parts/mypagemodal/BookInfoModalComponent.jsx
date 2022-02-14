import React from 'react';

function BookInfoModalComponent({ book, titleList }) {
  return (
    <React.Fragment>
      {titleList.map((title) => {
        return (
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center">
              <div className="font-medium text-gray-800">{book[title]}</div>
            </div>
          </td>
        );
      })}
    </React.Fragment>
  );
}

export default BookInfoModalComponent;
