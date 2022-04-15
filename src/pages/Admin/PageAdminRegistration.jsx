import AdminRegistration from 'components/maneger/AdminRegistration';
import { useParams, useNavigate } from 'react-router-dom';

function PageAdminRegistration() {
  const navigate = useNavigate();

  const { postId } = useParams();

  return (
    <AdminRegistration
      postId={postId}
      handleDidSave={(savedPost) => {
        navigate(`/admin/${savedPost.book_num}/`);
      }}
    />
  );
}
export default PageAdminRegistration;
