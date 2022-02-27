import ApplicationsBooks from './ApplicationsBooks';
import { Link, useLocation } from 'react-router-dom';

function ApplicationsList({ applicationList }) {
  let location = useLocation();

  return (
    <div className="border-t-4 border-blue-500">
      <div className="flex items-center w-full justify-center">
        <div className="bg-white shadow-xl rounded-lg py-14">
          <div className="px-24">
            <h3 className="font-semibold text-lg text-gray-800 text-center select-none px-1">
              신청 도서 목록
            </h3>
            <table className="text-xs ml-3 mt-3">
              <tbody>
                {applicationList?.slice(0, 3).map((application) => {
                  return (
                    <div key={application.application_num}>
                      <ApplicationsBooks application={application} />
                    </div>
                  );
                })}
              </tbody>
            </table>

            <div className="text-center mb-3">
              <button
                className="bg-indigo-600 mt-3 text-white hover:bg-indigo-700 text-sm font-bold uppercase px-3 py-1 rounded-full
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 underline-offset-4"
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
