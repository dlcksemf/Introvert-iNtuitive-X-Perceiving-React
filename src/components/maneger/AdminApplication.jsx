import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import React from 'react';
import { STATELIST } from 'Constants';

function AdminApplication({ application, reload }) {
  const [auth] = useAuth();
  const [color, setColor] = useState(() => {
    if (application.state === 'D') {
      return 'red';
    } else {
      return 'blue';
    }
  });

  useEffect(() => {
    if (application.state === 'D') {
      setColor('red');
    } else {
      setColor('blue');
    }
  }, [application]);

  const [, saveApplication] = useApiAxios(
    {
      url: `/books/api/applications/${application.application_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleStateClick = (e) => {
    let today = new Date();
    const date = new Date(+new Date(today) + 3240 * 10000)
      .toISOString()
      .split('T')[0];
    e.preventDefault();
    const { value } = e.target;

    window.confirm(`도서를 ${value === 'O' ? '주문' : '반려'} 하시겠습니까?`) &&
      saveApplication({
        data: { state: value, confirm_date: date },
      })
        .then(() => {
          reload();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <React.Fragment>
      <td className="flex items-center">
        <div className="ml-5">
          {application.state === 'P' && (
            <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
              <svg
                className="icon icon-tabler icon-tabler-check"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </div>
          )}
        </div>
      </td>
      <td className="">
        <div
          onClick={() => {
            window.open(
              `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${application.ISBN}`,
              'blank',
            );
          }}
          className="flex items-center cursor-pointer"
        >
          <p className="text-base font-medium leading-none text-gray-700">
            {application.title}
          </p>
          <div className="ml-1 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                stroke="#3B82F6"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                stroke="#3B82F6"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="ml-1 text-xs text-gray-700">{application.ISBN}</p>
          </div>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {application.writer}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {application.publisher}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {application.created_at.slice(0, 10)}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {/* {application.state !== 'P' ? application.updated_at : ''} */}
            {application.confirm_date}
          </p>
        </div>
      </td>
      <td>
        <div className="flex justify-center">
          {application.state === 'P' ? (
            <div className="text-xs">
              <button
                onClick={handleStateClick}
                value="O"
                className="py-2 px-2 mr-2 text-yellow-700 bg-yellow-100"
              >
                주문
              </button>
              <button
                onClick={handleStateClick}
                value="D"
                className="py-2 px-2 text-yellow-700 bg-yellow-100"
              >
                반려
              </button>
            </div>
          ) : (
            <button
              className={`cursor-default py-3 px-3 text-xs focus:outline-none leading-none text-${color}-700 bg-${color}-100 rounded`}
            >
              {STATELIST.application[application.state]}
            </button>
          )}
        </div>
      </td>
    </React.Fragment>
  );
}

export default AdminApplication;
