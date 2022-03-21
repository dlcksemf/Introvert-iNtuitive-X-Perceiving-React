import GameModal from 'components/parts/mypagemodal/GameModal';
import { useParams } from 'react-router-dom';

function PageGameModal() {
  const { modalType } = useParams();

  return (
    <div className="bg-slate-800 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center h-full md:inset-0">
      <div className="w-3/4 px-4 h-3/4 md:h-auto">
        <GameModal modalType={modalType} />
      </div>
    </div>
  );
}

export default PageGameModal;
