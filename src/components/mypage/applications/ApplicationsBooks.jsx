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

  const [apptitle] = useState(() => {
    if (application.state === 'P') {
      if (application.title.length > 15) {
        return application.title.slice(0, 15) + '...';
      } else {
        return application.title;
      }
    }
  });

  const [appstate] = useState(() => {
    if (application.state === 'P') {
      if (application.title.length > 15) {
        return (
          <Badge color={color}>
            {STATELIST.application[application.state]}
          </Badge>
        );
      } else {
        return (
          <Badge color={color}>
            {STATELIST.application[application.state]}
          </Badge>
        );
      }
    }
  });

  return (
    <td className="flex my-5 ml-8">
      {apptitle}

      <div className="ml-3">{appstate}</div>
    </td>
  );
}
export default ApplicationsBooks;
