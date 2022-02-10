function BookApplicationComponent({ application }) {
  return (
    <>
      {application && (
        <div className="flex">
          <div className="inline-block">{application.title}</div>
          <div className="mx-4 inline-block">{application.writer}</div>
          <div className="mx-4 inline-block">{application.publisher}</div>
          <div className="mx-4 inline-block">{application.ISBN}</div>

          <div className="mx-4 inline-block">{application.state}</div>
        </div>
      )}
    </>
  );
}

export default BookApplicationComponent;
