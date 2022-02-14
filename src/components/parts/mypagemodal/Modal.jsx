import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ModalComponent';

const TitleList = {
  applications: ['created_at', 'title', 'writer', 'state'],
  loanedbooks: [
    'loaned_date',
    'return_due_date',
    'returned_date',
    'title',
    'writer',
    'return_state',
  ],
  wishes: [
    'title',
    'writer',
    'state',
    // 'book_name.return_due_date',
  ],
};

function Modal({ modalType }) {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [{ data, loading, error, errorMessages }, getUserInfo] = useApiAxios(
    {
      url: `/books/api/${modalType}/?email=${auth.email}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    getUserInfo().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col justify-center h-full">
        <div
          id="defaultModal"
          className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"
        >
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                  {modalType}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => navigate(-1)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                  <div className="p-3">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                          <tr>
                            {TitleList[modalType].map((tableTitle, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <th className="p-2 whitespace-nowrap font-semibold text-left">
                                    {tableTitle}
                                  </th>
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {modalType === 'applications'
                            ? data?.results?.map((book, index) => {
                                return (
                                  <tr key={index}>
                                    <ModalComponent
                                      bookInfo={book}
                                      titleList={TitleList[modalType]}
                                    />
                                  </tr>
                                );
                              })
                            : data?.map((book, index) => {
                                return (
                                  <tr key={index}>
                                    <ModalComponent
                                      type={modalType}
                                      bookInfo={book.book_name}
                                      book={book}
                                      titleList={TitleList[modalType]}
                                    />
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
