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
      return (
        <div className="relative left-[55px] flex justify-start">
          {application.title}
        </div>
      );
    }
  });

  const [appstate] = useState(() => {
    if (application.state === 'P') {
      if (application.title.length > 15) {
        return (
          <div className="absolute right-[80px]">
            <Badge color={color}>
              {STATELIST.application[application.state]}
            </Badge>
          </div>
        );
      } else {
        return (
          <div className="absolute right-[80px]">
            <Badge color={color}>
              {STATELIST.application[application.state]}
            </Badge>
          </div>
        );
      }
    }
  });

  return (
    <div className="flex justify-between">
      <td className="flex my-5 ml-8">
        {apptitle}

        <div className="ml-3">{appstate}</div>
      </td>
    </div>
  );
}
export default ApplicationsBooks;
