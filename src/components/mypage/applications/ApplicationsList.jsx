import ApplicationsBooks from './ApplicationsBooks';

function ApplicationsList({ applicationList }) {
  return (
    <div>
      {applicationList?.map((application) => {
        return (
          <div>
            <ApplicationsBooks
              key={application?.application_num}
              application={application}
            />
          </div>
        );
      })}
    </div>
  );
}
export default ApplicationsList;
