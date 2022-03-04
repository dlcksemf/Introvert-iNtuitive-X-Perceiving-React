import { Link } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';

function AdminBookSummary({ post }) {
  return (
    <div className="m-auto px-4 py-4 max-w-xl">
      <div className="bg-gray-100 hover:bg-blue-100 border-gray-100 border-2 rounded-lg overflow-hidden mb-10">
        {post.cover_photo && (
          <Link to={`/admin/${post.book_num}/`}>
            <img src={post.cover_photo} alt={post.title} className="w-full" />
          </Link>
        )}
        {!post?.cover_photo && (
          <Link to={`/admin/${post.book_num}/`}>
            <img src={non_image} alt={post.title} className="w-full" />
          </Link>
        )}
        <div className="p-8 sm:p-9 md:p-7 xl:p-9">
          <h3 className="font-semibold text-dark text-center">
            <Link to={`/admin/${post.book_num}/`}>
              {post.title} - {post.writer}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AdminBookSummary;
