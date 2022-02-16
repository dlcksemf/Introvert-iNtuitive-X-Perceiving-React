import { Link } from 'react-router-dom';

function AdminBookSummary({ post }) {
  return (
    <div className="m-auto px-4 py-4 max-w-xl">
      <div className="bg-gray-100 border-gray-100 border-2 rounded-lg overflow-hidden mb-10">
        {post.cover_photo && (
          <img src={post.cover_photo} alt={post.title} className="w-full" />
        )}
        <div className="p-8 sm:p-9 md:p-7 xl:p-9">
          <h3 className="font-semibold text-dark">
            <Link to={`/admin/${post.book_num}/`}>{post.title}</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AdminBookSummary;
