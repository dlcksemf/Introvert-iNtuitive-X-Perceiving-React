import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';

function AdminBookDetail({ postId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [{ data: post, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/books/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/books/api/books/${postId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    // e.preventDeafault();
    window.confirm('도서를 삭제하시겠습니까?') &&
      deletePost().then(() => {
        navigate('/admin/booklist/');
      });
  };

  // const notify = () => toast('Wow so easy!');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const aladinLink = () => {
    window.open(
      `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${post.ISBN}`,
      '_blank',
    );
  };

  const hopeBookLink = () => {
    window.open(
      `http://djbook.or.kr/bookstore?command=bookstoreList`,
      '_blank',
    );
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중..</LoadingIndicator>}
      {error &&
        `로딩 중 에러(${deleteError.response.status} ${deleteError.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생 (${deleteError.response.status} ${deleteError.response.statusText})`}
      {post && (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pb-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {post?.cover_photo && (
                  <img
                    src={post?.cover_photo}
                    alt={post?.title}
                    className="lg:w-2/6 w-full lg:h-2/6 h-64 object-cover object-center ml-28 mr-10 mt-14"
                  />
                )}
                {!post?.cover_photo && (
                  <img
                    src={non_image}
                    alt="non_image"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  />
                )}
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  {post?.category && (
                    <h2 className="text-sm title-font text-gray-500 tracking-widest mt-5 mb-3">
                      [ {post?.category} ]
                    </h2>
                  )}
                  <h1 className="text-gray-800 text-3xl title-font font-bold mb-5">
                    {post?.title}
                  </h1>
                  <h1 className="text-gray-900 text-xl title-font font-medium mb-5">
                    {post?.writer}
                  </h1>
                  <div className="mb-4 ml-2 border-l-2 border-gray-200">
                    <div className="">
                      {post?.translator && (
                        <div className="pl-4 py-2">역자 {post?.translator}</div>
                      )}
                      <div className="flex py-2 pl-4 ">{post?.publisher}</div>
                      <div className="flex pl-4 py-2">
                        {post?.published_date}
                      </div>
                      <div className="flex pl-4 py-2">ISBN {post?.ISBN}</div>
                    </div>
                    <div className="flex pl-4 py-2">수량 : {post?.amount}</div>
                  </div>
                  <div className="leading-relaxed mt-10">
                    {post?.story.split(/[\r\n]+/).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={hopeBookLink}
                      className="text-gray-600 text-s mb-10 hover:text-indigo-500 select-none
                      transition duration-500 ease-in-out "
                    >
                      대전 책방 알아보기
                    </button>
                  </div>
                  <div className="flex items-center border-b-2 border-gray-100 mb-3 select-none">
                    <button
                      onClick={aladinLink}
                      className="text-gray-600 text-s mb-10 hover:text-indigo-500 
                      transition duration-500 ease-in-out "
                    >
                      알라딘에서 책찾기
                    </button>
                  </div>

                  <div className="flex justify-start">
                    <Link to="/admin/booklist/">
                      <div
                        className="flex m-auto mr-48
                  text-gray-600 hover:text-indigo-500
                  border-2 border-gray-200 py-2 px-3 focus:outline-none rounded
                  "
                      >
                        목록으로
                      </div>
                    </Link>
                    <Link to={`/admin/book/${postId}/edit/`}>
                      <div
                        className="flex m-auto
                  text-gray-600 hover:text-indigo-500 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  "
                      >
                        수정
                      </div>
                    </Link>
                    <div className="flex">
                      <button
                        disabled={deleteLoading}
                        onClick={handleDelete}
                        className="flex m-auto ml-5
                      text-gray-600 hover:text-indigo-500 
                      border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                      "
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default AdminBookDetail;
