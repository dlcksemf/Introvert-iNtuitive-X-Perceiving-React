import { useParams, useNavigate } from 'react-router-dom';
import AdminGameForm from './AdminGameForm';

function AdminGameFormPage() {
  const navigate = useNavigate();

  const { gameId } = useParams();

  return (
    <AdminGameForm
      gameId={gameId}
      handleDidSaveGame={(savedGame) => {
        navigate(`/admin/gamelist/${savedGame.game_num}/`);
      }}
    />
  );
}

export default AdminGameFormPage;
