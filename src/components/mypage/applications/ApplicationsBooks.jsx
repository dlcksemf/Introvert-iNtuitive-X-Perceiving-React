import Badge from 'designMaterials/Badge';
import { useState } from 'react';
import { STATELIST } from 'Constants';

function ApplicationsBooks({ application }) {
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
    <td className="flex my-5 ml-2">
      {application.title}

      <div className="ml-3">
        <Badge color={color}>{STATELIST.application[application.state]}</Badge>
      </div>
    </td>
  );
}
export default ApplicationsBooks;
