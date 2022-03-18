import ReviewForm from 'components/books/ReviewForm';
import { useParams } from 'react-router-dom';

function ReviewPage({ book, setReload }) {
  const { reviewId } = useParams();

  return <ReviewForm reviewId={reviewId} book={book} setReload={setReload} />;
}

export default ReviewPage;
