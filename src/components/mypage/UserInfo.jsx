import { Link, useLocation } from 'react-router-dom';

function UserInfo({ info }) {
  let location = useLocation();

  return (
    <div>
      <div class="flex items-center w-full justify-center">
        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-lg py-8">
            <div class="px-16">
              <h3 class="font-semibold text-md text-gray-800 text-center select-none">
                내 정보
              </h3>
              <table class="text-sm my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-600 font-semibold select-none">
                      이름
                    </td>
                    <td
                      class="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.username}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-600 font-semibold select-none">
                      직급
                    </td>
                    <td
                      class="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.position}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-600 font-semibold select-none">
                      생년월일
                    </td>
                    <td
                      class="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.birthdate}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-600 font-semibold select-none">
                      전화번호
                    </td>
                    <td
                      class="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.phone_num}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-600 font-semibold select-none">
                      Email
                    </td>
                    <td
                      class="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.email}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center my-3">
                <div>
                  <button
                    class="bg-indigo-600 mt-3 text-white hover:bg-indigo-700 text-sm font-bold uppercase px-3 py-1 rounded-full
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 underline-offset-4"
                    type="button"
                  >
                    <Link
                      to="/accounts/modal/userinfo/"
                      state={{ backgroundLocation: location }}
                    >
                      정보 수정하기
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
