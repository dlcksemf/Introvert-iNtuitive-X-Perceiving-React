import InfoEditModal from 'components/parts/mypagemodal/InfoEditModal';

function PageUserInfoModal() {
  return (
    <div className="bg-slate-800 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center h-full md:inset-0">
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <InfoEditModal />
      </div>
    </div>
  );
}

export default PageUserInfoModal;
