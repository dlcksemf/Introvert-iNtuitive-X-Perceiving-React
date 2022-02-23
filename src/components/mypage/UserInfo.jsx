import { Link, useLocation } from 'react-router-dom';

function UserInfo({ info }) {
  let location = useLocation();

  return (
    <div>
      <div class="flex items-center w-full justify-center">
        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="p-2">
              <h3 class="font-semibold text-base text-blueGray-700 text-center">
                내 정보
              </h3>
              <table class="text-xs my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">이름</td>
                    <td class="px-2 py-2">{info?.username}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">직급</td>
                    <td class="px-2 py-2">{info?.position}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      생년월일
                    </td>
                    <td class="px-2 py-2">{info?.birthdate}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      전화번호
                    </td>
                    <td class="px-2 py-2">{info?.phone_num}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">{info?.email}</td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center my-3">
                <div class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">
                  <Link
                    to="/accounts/modal/userinfo/"
                    state={{ backgroundLocation: location }}
                  >
                    정보 수정하기
                  </Link>
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
