import DebugStates from 'base/DebugStates';
import Badge from 'designMaterials/Badge';
import { useEffect, useState } from 'react';

function ApplicationsBooks({ application }) {
  const [color, setColor] = useState(() => {
    if (application.state === 'P') {
      return 'yellow';
    } else if (application.state === 'D') {
      return 'red';
    } else {
      return 'green';
    }
  });

  useEffect(() => {
    if (application.state === 'P') {
      setColor('yellow');
    } else if (application.state === 'D') {
      setColor('red');
    } else {
      setColor('green');
    }
  }, [application]);

  return (
    <div>
      {application.title}

      <Badge color={color}>{application.state}</Badge>
    </div>
  );
}
export default ApplicationsBooks;
