import ApplicationsBooks from './ApplicationsBooks';
import { Link, useLocation } from 'react-router-dom';

function ApplicationsList({ applicationList }) {
  let location = useLocation();

  return (
    <div>
      {applicationList?.map((application) => {
        return (
          <div key={application.application_num}>
            <ApplicationsBooks application={application} />
          </div>
        );
      })}

      <Link
        to={`/accounts/modal/applications/`}
        state={{ backgroundLocation: location }}
      >
        전체 내역 보기
      </Link>
    </div>
  );
}
export default ApplicationsList;
