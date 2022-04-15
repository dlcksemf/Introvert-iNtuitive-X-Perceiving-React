import { NavLink } from 'react-router-dom';

function NoListApplication({ children }) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="my-7 text-xl font-semibold text-base text-blueGray-700">
        {children}
      </div>
      <button
        className=" bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold uppercase px-4 py-3 rounded-full
      "
      >
        <NavLink to="/books/application/new/" type="button">
          대출 신청으로!
        </NavLink>
      </button>
      <div className="h-32"></div>
    </div>
  );
}

export default NoListApplication;
