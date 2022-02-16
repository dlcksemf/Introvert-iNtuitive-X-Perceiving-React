import React from 'react';

function ModalComponent({ titleList, bookInfo, type }) {
  console.log(bookInfo.return_due_date);

  return (
    <React.Fragment>
      {titleList.map((title, key) => {
        return (
          <td key={key} className="p-2 whitespace-nowrap">
            <div className="flex items-center">
              <div className="font-medium text-gray-800">
                {type === 'wishes' &&
                  title === 'return_due_date' &&
                  bookInfo['loaned_books'][0].return_due_date}

                {title === 'created_at'
                  ? bookInfo[title].slice(0, 10)
                  : bookInfo[title]}
              </div>
            </div>
          </td>
        );
      })}
    </React.Fragment>
  );
}

export default ModalComponent;
