import { useParams } from 'react-router-dom';
import AdminGameDetail from './AdminGameDetail';

function AdminGameDetailPage() {
  const { gameId } = useParams();
  return (
    <div>
      <AdminGameDetail gameId={gameId} />
    </div>
  );
}

export default AdminGameDetailPage;
