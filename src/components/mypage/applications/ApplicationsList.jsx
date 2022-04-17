import ApplicationsBooks from './ApplicationsBooks';
import NoListApplication from '../NoListApplication';

function ApplicationsList({ applicationList }) {
  return (
    <div className="block w-full overflow-x-auto text-gray-800 select-none">
      {applicationList?.length === 0 ? (
        <NoListApplication>도서 대출하러 가기!</NoListApplication>
      ) : (
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                <h1 className="absolute left-[88px] top-[95px]">도서명</h1>
              </th>
              <th
                className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
              h-[45px]"
              >
                <h1 className="absolute right-[115px] top-[95px]">상태</h1>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {applicationList
              ?.filter((application) => application.state === 'P')
              .slice(0, 9)
              .map((application) => {
                return (
                  <tr key={application.application_num}>
                    <ApplicationsBooks application={application} />
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ApplicationsList;
