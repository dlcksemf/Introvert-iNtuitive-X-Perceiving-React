import { useParams } from 'react-router-dom';
import GameDetail from './GameDetail';

function GameDetailPage() {
  const { gameId } = useParams();
  return (
    <div>
      <GameDetail gameId={gameId} />
    </div>
  );
}
export default GameDetailPage;
