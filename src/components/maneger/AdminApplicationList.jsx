import { useApiAxios } from 'base/api/base';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'css/Paging.css';
import React from 'react';
import AdminApplication from './AdminApplication';
import { itemsPerPage } from 'Constants';
import StateCategory from 'components/parts/StateCategory';
import { STATELIST } from 'Constants';

function AdminApplicationList() {
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
        state: category === 'ALL' ? '' : category,
      };

      const { data } = await getApplications({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data.results);
    },
    [category, getApplications],
  );

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications, category]);

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-end justify-between">
            <p className="focus:outline-none text-base text-3xl font-bold leading-normal text-gray-800">
              신청 도서 관리
            </p>

            <StateCategory
              setCategory={setCategory}
              category={category}
              stateObject={STATELIST.application}
            />
          </div>

          <div className="mt-7">
            <table className="w-full">
              <tbody>
                <tr className="focus:outline-none h-16 border border-gray-100 bg-gray-100 rounded font-semibold text-dark">
                  <td>
                    <div className="ml-5"></div>
                  </td>
                  <td className="">
                    <div className="flex items-center cursor-default">
                      <p className="text-sm leading-none text-gray-600">제목</p>
                    </div>
                  </td>
                  <td className="pl-7">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        저자
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
                  <td className="pl-3">
                    <div className="flex items-center justify-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        주문 상태
                      </p>
                    </div>
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
