import { Link, useLocation } from 'react-router-dom';

function UserInfo({ info }) {
  let location = useLocation();

  return (
    <div>
      <div className="flex items-center w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-8">
            <div className="px-16">
              <h3 className="font-semibold text-md text-gray-800 text-center select-none">
                내 정보
              </h3>
              <table className="text-sm my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                      이름
                    </td>
                    <td
                      className="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.username}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                      직급
                    </td>
                    <td
                      className="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.position}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                      생년월일
                    </td>
                    <td
                      className="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.birthdate}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                      전화번호
                    </td>
                    <td
                      className="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.phone_num}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                      Email
                    </td>
                    <td
                      className="px-2 py-2 text-gray-800 font-semibold select-none
                    transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                    >
                      {info?.email}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center my-3">
                <div>
                  <button
                    className="bg-indigo-600 mt-3 text-white hover:bg-indigo-700 text-sm font-bold uppercase px-3 py-1 rounded-full
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
