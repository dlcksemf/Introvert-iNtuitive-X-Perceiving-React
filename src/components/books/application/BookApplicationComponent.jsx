import Badge from 'designMaterials/Badge';
import { useState } from 'react';

function BookApplicationComponent({ application }) {
  const [color] = useState(() => {
    if (application.state === 'P') {
      return 'yellow';
    } else if (application.state === 'D') {
      return 'red';
    } else {
      return 'green';
    }
  });

  return (
    <>
      {application && (
        <div className="flex">
          <div className="inline-block">{application.title}</div>
          <div className="mx-4 inline-block">{application.writer}</div>
          <div className="mx-4 inline-block">{application.publisher}</div>
          <div className="mx-4 inline-block">{application.ISBN}</div>

          <Badge color={color}>{application.state}</Badge>
        </div>
      )}
    </>
  );
}

export default BookApplicationComponent;
