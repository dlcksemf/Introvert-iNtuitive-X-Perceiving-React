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
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {post?.cover_photo && (
                  <img
                    src={post?.cover_photo}
                    alt={post?.title}
                    className="lg:w-2/6 w-full lg:h-2/6 h-64 object-cover object-center ml-28 mr-10 mt-14
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:skew-y-6"
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
                    <h2 className="text-sm title-font text-gray-500 tracking-widest select-none mt-5 mb-3">
                      [ {post?.category} ]
                    </h2>
                  )}
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-5 select-none
                  hover:font-semibold"
                  >
                    {post?.title}
                  </h1>
                  <h1 className="text-gray-900 text-xl title-font font-medium mb-5 select-none hover:font-semibold">
                    {post?.writer}
                  </h1>
                  <div className="flex mb-4 select-none">
                    {post?.translator && (
                      <>
                        <span className="flex items-center select-none">
                          역자 {post?.translator}
                        </span>
                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s" />
                      </>
                    )}
                    <span className="flex py-2 select-none">
                      {post?.publisher}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      {post?.published_date}
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s select-none">
                      ISBN {post?.ISBN}
                    </span>
                  </div>
                  <div className="leading-relaxed select-none mt-14 hover:text-gray-900">
                    {post?.story.split(/[\r\n]+/).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={hopeBookLink}
                      className="text-gray-600 text-s mb-10 hover:text-blue-500 hover:font-bold
                      transition duration-500 ease-in-out hover:scale-105"
                    >
                      대전 책방 찾아보기
                    </button>
                  </div>
                  <div className="flex items-center border-b-2 border-gray-100 mb-3">
                    <button
                      onClick={aladinLink}
                      className="text-gray-600 text-s mb-10 hover:text-blue-500 hover:font-bold
                      transition duration-500 ease-in-out hover:scale-105"
                    >
                      알라딘에서 찾아보기
                    </button>
                  </div>

                  <div className="flex justify-start">
                    <Link to="/admin/booklist/">
                      <div
                        className="flex m-auto ml-auto 
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        목록으로
                      </div>
                    </Link>
                    <Link to={`/admin/book/${postId}/edit/`}>
                      <div
                        className="flex m-auto ml-52
                  text-gray-600 hover:text-blue-500 hover:font-bold 
                  border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        수정
                      </div>
                    </Link>
                    <div className="flex">
                      <button
                        disabled={deleteLoading}
                        onClick={handleDelete}
                        className="flex m-auto ml-5
                      text-gray-600 hover:text-blue-500 hover:font-bold 
                      border-2 border-gray-200 py-2 px-6 focus:outline-none rounded
                      transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
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
