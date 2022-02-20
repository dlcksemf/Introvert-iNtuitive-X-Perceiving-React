import { useApiAxios } from 'base/api/base';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import React from 'react';
import AdminApplication from './AdminApplication';
import { STATELIST } from 'Constants';

function AdminApplicationList({ itemsPerPage = 5 }) {
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(
    Object.keys(STATELIST.application)[0],
  );

  const [{ data }, getApplications] = useApiAxios(
    {
      url: '/books/api/applications/',
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage) => {
      const params = {
        page_size: 5,
        page: newPage,
        state: category === 'A' ? '' : category,
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data.results);
    },
    [category],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications, category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  return (
    <>
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              신청 도서 관리
            </p>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              {Object.values(STATELIST.application).map((state, index) => (
                <div
                  key={index}
                  className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-2"
                >
                  <button
                    onClick={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={Object.keys(STATELIST.application)[index]}
                    className={`text-xs py-2 px-4 ${
                      category === Object.keys(STATELIST.application)[index] &&
                      'bg-indigo-100 text-indigo-700'
                    } text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full`}
                  >
                    {state}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr className="focus:outline-none h-16 border border-gray-100 bg-gray-100 rounded">
                  <td>
                    <div className="ml-5">
                      <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                        />
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
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center pl-5 cursor-pointer">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        제목
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        작가
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        출판사
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        신청일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        처리일
                      </p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <p className="text-sm leading-none text-gray-600 ml-2">
                      주문 상태
                    </p>
                  </td>
                </tr>

                {data?.results?.map((application) => (
                  <React.Fragment key={application.application_num}>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                      <AdminApplication
                        application={application}
                        reload={() => {
                          fetchApplications(page);
                        }}
                      />
                    </tr>
                    <tr className="h-3"></tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />

      <div className="h-10"></div>
    </>
  );
}

export default AdminApplicationList;
