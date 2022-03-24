import GameReviewForm from 'components/Game/GameReviewForm';
import { useParams } from 'react-router-dom';

function ReviewPage({ game, setReload }) {
  const { gameId } = useParams();

  return <GameReviewForm gameId={gameId} game={game} setReload={setReload} />;
}

export default ReviewPage;
