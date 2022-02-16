function ConfirmationModal({ children, handleOkButton, handleCancleButton }) {
  const cancleButtonClicked = () => {
    if (handleCancleButton) {
      handleCancleButton();
    } else {
      console.error('no handle cancle function');
    }
  };

  const submitButtonClicked = (e) => {
    if (handleOkButton) {
      handleOkButton(e);
    } else {
      console.error('no handle delete function');
    }
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">{children} </h1>
        <button
          onClick={cancleButtonClicked}
          className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancle
        </button>
        <button
          onClick={submitButtonClicked}
          className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
