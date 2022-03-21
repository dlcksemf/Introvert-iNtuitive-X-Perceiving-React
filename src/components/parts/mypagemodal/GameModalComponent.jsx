import React, { useState, useEffect } from 'react';
import { STATELIST } from 'Constants';

function GameModalComponent({ titleList, gameInfo, modalType }) {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    setContentList([]);
    titleList.map((game) => {
      if (game === 'created_at') {
        setContentList((prev) => [...prev, gameInfo[game].slice(0, 10)]);
      } else if (game === 'game') {
        setContentList((prev) => [
          ...prev,
          gameInfo[game].slice(0, 15) + '...',
        ]);
      } else if (game === 'game_state' || game === 'return_state') {
        setContentList((prev) => [...prev, STATELIST['game'][gameInfo[game]]]);
      } else {
        setContentList((prev) => [...prev, gameInfo[game]]);
      }
    });
  }, [titleList, gameInfo, modalType]);

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

export default GameModalComponent;
