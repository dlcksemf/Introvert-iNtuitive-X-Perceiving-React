import { useParams } from 'react-router-dom';
import AdminBookDetail from './AdminBookDetail';

function PageAdminBookDetail() {
  const { postId } = useParams();
  return (
    <div>
      <AdminBookDetail postId={postId} />
    </div>
  );
}

export default PageAdminBookDetail;
