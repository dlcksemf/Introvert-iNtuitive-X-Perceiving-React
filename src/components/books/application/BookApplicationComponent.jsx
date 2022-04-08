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
          <tr className="bg-white border-b">
            <th className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-left">
              {application.title}
            </th>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
              {application.writer}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
              {application.publisher}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
              {application.ISBN}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
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
