import InfoEditModal from 'components/parts/mypagemodal/InfoEditModal';

function PageUserInfoModal() {
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col justify-center h-full">
        <div
          id="defaultModal"
          className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"
        >
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <InfoEditModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageUserInfoModal;
