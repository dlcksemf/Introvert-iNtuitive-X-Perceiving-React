import ApplicationsBooks from './ApplicationsBooks';
import { Link, useLocation } from 'react-router-dom';

function ApplicationsList({ applicationList }) {
  let location = useLocation();

  return (
    <div className="mt-10">
      <div className="flex items-center w-full justify-center">
        <div className="bg-white w-80 h-80 shadow-xl rounded-lg ">
          <div className="py-5">
            <h3 className="font-semibold text-lg text-gray-800 text-center select-none px-1">
              신청 도서 목록
            </h3>
            <table className="text-xs ml-3 mt-3 select-none">
              <tbody>
                {applicationList?.slice(0, 3).map((application) => {
                  return (
                    <tr key={application.application_num}>
                      <ApplicationsBooks application={application} />
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-center mb-3 select-none">
              <button
                className="bg-indigo-500 mt-3 text-white hover:bg-indigo-400 text-sm font-bold uppercase px-3 py-2 rounded-full
               "
                type="button"
              >
                <Link
                  to={`/accounts/modal/applications/`}
                  state={{ backgroundLocation: location }}
                >
                  전체 내역 보기
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApplicationsList;
