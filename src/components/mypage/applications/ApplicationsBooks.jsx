import DebugStates from 'base/DebugStates';

function ApplicationsBooks({ application }) {
  return (
    <div>
      {application.title}
      <DebugStates application={application} />
    </div>
  );
}
export default ApplicationsBooks;
