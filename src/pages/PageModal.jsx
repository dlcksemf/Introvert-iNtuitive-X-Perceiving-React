import Modal from 'components/parts/mypagemodal/Modal';
import { useParams } from 'react-router-dom';

function PageModal() {
  const { modalType } = useParams();

  return <Modal modalType={modalType} />;
}

export default PageModal;
