import ApplicationsBooks from './ApplicationsBooks';

function ApplicationsList({ applicationList }) {
  return (
    <div className="flex">
      {applicationList?.map((application) => {
        return (
          <ApplicationsBooks
            key={application?.application_num}
            application={application}
          />
        );
      })}
    </div>
  );
}
export default ApplicationsList;
