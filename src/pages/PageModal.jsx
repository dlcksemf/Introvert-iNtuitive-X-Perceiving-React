import Modal from 'components/parts/mypagemodal/Modal';
import { useParams } from 'react-router-dom';

function PageModal() {
  const { modalType } = useParams();

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col justify-center h-full">
        <div
          id="defaultModal"
          className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"
        >
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <Modal modalType={modalType} />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageModal;
