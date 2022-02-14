import React from 'react';

function ModalComponent({ titleList, bookInfo, book, type }) {
  return (
    <React.Fragment>
      {titleList.map((title, key) => {
        return (
          <td key={key} className="p-2 whitespace-nowrap">
            <div className="flex items-center">
              <div className="font-medium text-gray-800">
                {bookInfo[title]}
                {type === 'loanedbooks' && book[title]}
                {/* {type === 'wishes' && book[title]} */}
              </div>
            </div>
          </td>
        );
      })}
    </React.Fragment>
  );
}

export default ModalComponent;
