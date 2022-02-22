import ApplicationsBooks from './ApplicationsBooks';
import { Link, useLocation } from 'react-router-dom';

function ApplicationsList({ applicationList }) {
  let location = useLocation();

  return (
    <div>
      <div class="flex items-center w-full justify-center">
        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="p-2">
              <h3 class="font-semibold text-base text-blueGray-700 text-center ml-24 mr-24">
                신청 도서 목록
              </h3>
              <table class="text-xs my-3">
                <tbody>
                  {applicationList?.map((application) => {
                    return (
                      <div key={application.application_num}>
                        <ApplicationsBooks application={application} />
                      </div>
                    );
                  })}
                </tbody>
              </table>

              <div class="text-center my-3">
                <button
                  class="bg-indigo-500 mt-10 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
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
    </div>
  );
}
export default ApplicationsList;
