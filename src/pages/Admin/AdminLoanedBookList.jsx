import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import Badge from 'designMaterials/Badge';
import { useEffect, useState } from 'react';

function AdminLoanedBookList({ book, setSelectedState }) {
  const [auth] = useAuth();
  const [query, setQuery] = useState();
  const [visivle, setVisible] = useState(false);
  const [, setReload] = useReload();

  // 지원 되는 것을 개별적으로 뽑아내기 위해 {}
  // 첫 값은 상탯값 두 번째는 refetch
  const [{ data: postList }, refetch] = useApiAxios(
    {
      url: `books/api/loanedbooks/${query ? '?query=' + query : ''}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const [{ loading, error }, updateState] = useApiAxios(
    {
      url: `/books/api/loanedbooks/${postList?.loan_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    const loan_num = e.target.value;
    window.confirm('반납 상태를 변경하시겠습니까?');
    updateState({
      data: { return_state: 'R' },
      url: `/books/api/loanedbooks/${loan_num}/`,
      method: 'PATCH',
    });
    window.location.replace('/manager/loanedbook/');
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [auth]);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchBook_name = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  let today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [color] = useState(() => {
    if (postList?.return_state === 'L') {
      return 'yellow';
    } else if (postList?.return_state === 'R') {
      return 'red';
    } else {
      return 'blue';
    }
  });

  const state = ['All', 'Loaned', 'Pending', 'Register', 'Overdue'];

  return (
    <div>
      <div class="bg-white p-8 rounded-md w-full">
        <div class=" flex items-center justify-between pb-6">
          <div>
            <h2 class="text-gray-600 font-semibold">도서 대출 관리</h2>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <select
                class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {state.map((field) => (
                  <option value={field}>{field}</option>
                ))}
              </select>
            </div>
            <div class="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                class="bg-gray-50 outline-none ml-1 block "
                type="text"
                onChange={getQuery}
                placeholder="도서명을 입력해주세요."
                onKeyPress={searchBook_name}
              />
            </div>
          </div>
        </div>
        <div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대출자
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      도서명
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대출 현황
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      연체 일자
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      상태
                    </th>
                  </tr>
                </thead>
                {postList?.map((post) => (
                  <tbody>
                    <tr>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {post?.email.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {post?.book_name.title}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                          {/* <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span> */}
                          <span class="relative">
                            <Badge color={color}>{post?.return_state}</Badge>
                          </span>
                        </span>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {post?.return_state === 'L' &&
                          new Date(post?.return_due_date) < new Date(date)
                            ? Math.floor(
                                (Date.parse(date) -
                                  Date.parse(post?.return_due_date)) /
                                  (1000 * 3600 * 24),
                              ) + '일 연체'
                            : post?.return_state === 'L' && '대출중'}
                          {post?.return_state === 'P' && '반납 신청중'}
                          {post?.return_state === 'R' && '반납 완료'}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                          onClick={handleClickSubmitButton}
                          value={post.loan_num}
                        >
                          {post?.return_state === 'P' ? '반납 확인' : ''}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminLoanedBookList;
