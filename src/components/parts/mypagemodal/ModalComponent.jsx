import React, { useState, useEffect } from 'react';
import { STATELIST } from 'Constants';

function ModalComponent({ titleList, bookInfo, modalType }) {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    setContentList([]);
    titleList.map((title) => {
      if (title === 'title') {
        if (bookInfo[title].length > 15) {
          setContentList((prev) => [
            ...prev,
            bookInfo[title].slice(0, 15) + '...',
          ]);
        } else {
          setContentList((prev) => [...prev, bookInfo[title]]);
        }
      } else if (title === 'state' || title === 'return_state') {
        setContentList((prev) => [
          ...prev,
          STATELIST[modalType][bookInfo[title]],
        ]);
      } else if (title === 'created_at') {
        setContentList((prev) => [...prev, bookInfo[title].substring(0, 10)]);
      } else {
        setContentList((prev) => [...prev, bookInfo[title]]);
      }
    });
  }, [titleList, bookInfo, modalType]);

  return (
    <React.Fragment>
      {contentList.map((content, key) => (
        <td key={key} className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="font-medium text-gray-800">{content}</div>
          </div>
        </td>
      ))}
    </React.Fragment>
  );
}

export default ModalComponent;
