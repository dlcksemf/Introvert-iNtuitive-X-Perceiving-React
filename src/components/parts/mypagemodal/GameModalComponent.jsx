import React, { useState, useEffect } from 'react';
import { STATELIST } from 'Constants';

function GameModalComponent({ titleList, gameInfo, modalType }) {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    setContentList([]);
    titleList.map((game) => {
      // game.returned_time.replace('T', ' ').substring(0, 16);
      if (game === 'loaned_time') {
        setContentList((prev) => [
          ...prev,
          gameInfo[game].replace('T', ' ').substring(0, 16),
        ]);
      } else if (game === 'return_due_time') {
        setContentList((prev) => [
          ...prev,
          gameInfo[game].replace('T', ' ').substring(0, 16),
        ]);
      } else if (game === 'game_name') {
        if (gameInfo[game].length > 15) {
          setContentList((prev) => [
            ...prev,
            gameInfo[game].slice(0, 15) + '...',
          ]);
        } else {
          setContentList((prev) => [...prev, gameInfo[game]]);
        }
      } else if (game === 'game_state' || game === 'return_state') {
        setContentList((prev) => [...prev, STATELIST['game'][gameInfo[game]]]);
      } else if (game === 'returned_time') {
        if (gameInfo[game] !== null) {
          setContentList((prev) => [
            ...prev,
            gameInfo[game].replace('T', ' ').substring(0, 16),
          ]);
        } else {
          setContentList((prev) => [...prev, gameInfo[game]]);
        }
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
