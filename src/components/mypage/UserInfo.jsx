import { Link, useLocation } from 'react-router-dom';

function UserInfo({ info }) {
  let location = useLocation();

  return (
    <div className="relative left-[71px] bottom-[60px]">
      <div className="border-2 border-gray-100 h-[350px] w-[350px] shadow-xl">
        <h3 className="font-semibold text-xl text-gray-800 text-center select-none relative top-[10px]">
          내 정보
        </h3>
        <table className="text-lg relative left-[20px] top-[20px]">
          <tbody>
            <tr>
              <td className="px-2 py-2 text-gray-600 font-semibold select-none">
                이름
              </td>
              <td
                className="px-2 py-2 text-gray-800 font-semibold select-none
                    "
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
                    "
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
                   "
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
                    "
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
                   "
              >
                {info?.email}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className="bg-indigo-500 mt-3 text-white hover:bg-indigo-600 text-sm font-bold 
              uppercase px-3 py-2 rounded relative left-[120px] top-[30px]"
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
  );
}

export default UserInfo;
