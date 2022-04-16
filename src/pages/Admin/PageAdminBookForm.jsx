import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useParams, useNavigate } from 'react-router-dom';
import AdminBookForm from './AdminBookForm';

function PageAdminBookForm() {
  const navigate = useNavigate();

  const { postId } = useParams();

  const [auth] = useAuth();

  const [{ data: post }, refetch] = useApiAxios(
    {
      url: `books/api/books/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    {
      manual: !postId,
    },
  );
  return (
    <AdminBookForm
      post={post}
      postId={postId}
      handleDidSave={(savedPost) => {
        navigate(`/admin/${savedPost.book_num}/`);
      }}
    />
  );
}
export default PageAdminBookForm;
