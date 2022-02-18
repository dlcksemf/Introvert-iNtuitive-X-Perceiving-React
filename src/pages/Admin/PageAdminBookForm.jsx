import { useParams, useNavigate } from 'react-router-dom';
import AdminBookForm from './AdminBookForm';

function PageAdminBookForm() {
  const navigate = useNavigate();

  const { postId } = useParams();

  return (
    <AdminBookForm
      postId={postId}
      handleDidSave={(savedPost) => {
        navigate(`/admin/${savedPost.book_num}/`);
      }}
    />
  );
}
export default PageAdminBookForm;
