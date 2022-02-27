import Badge from 'designMaterials/Badge';
import React, { useState } from 'react';
import { STATELIST } from 'Constants';

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
      <React.Fragment>
        {application && (
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              {application.title}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              {application.writer}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              {application.publisher}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              {application.ISBN}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <Badge color={color}>
                {STATELIST.application[application.state]}
              </Badge>
            </td>
          </tr>
        )}
      </React.Fragment>
    </>
  );
}

export default BookApplicationComponent;
