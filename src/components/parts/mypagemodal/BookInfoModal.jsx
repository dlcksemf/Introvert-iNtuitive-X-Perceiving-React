import DebugStates from 'base/DebugStates';
import React from 'react';
import BookInfoModalComponent from './BookInfoModalComponent';

function BookInfoModal({ bookList, titleList }) {
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Customers</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {titleList.map((tableTitle, index) => {
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
                  {bookList.map((book, index) => {
                    return (
                      <tr key={index}>
                        <BookInfoModalComponent
                          book={book}
                          titleList={titleList}
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
  );
}

export default BookInfoModal;
