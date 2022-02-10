import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AdminBookSummary from './AdminBookSummary';

function AdminBookList() {
  const [auth] = useAuth();
  const [query, setQuery] = useState();
  // 지원 되는 것을 개별적으로 뽑아내기 위해 {}
  // 첫 값은 상탯값 두 번째는 refetch
  const [{ data: postList, loading, error }, refetch] = useApiAxios(
    {
      url: `books/api/books/${query ? '?query=' + query : ''}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchTitle = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div className="my-5">
      <ToastContainer />
      <div className="text-center mb-2">
        <input
          type="text"
          onChange={getQuery}
          placeholder="도서명을 입력해주세요."
          onKeyPress={searchTitle}
        />
      </div>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {postList && (
        <div className="flex flex-wrap">
          {postList?.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-1/2 xl:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300"
            >
              <AdminBookSummary post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookList;
