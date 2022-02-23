import { NavLink } from 'react-router-dom';

function NoList({ children }) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="my-7 text-xl font-semibold text-base text-blueGray-700">
        {children}
      </div>
      <NavLink
        className="bg-yellow-400 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
        to="/books/booklist/"
      >
        도서 목록으로!
      </NavLink>
      <div className="h-7"></div>
    </div>
  );
}

export default NoList;
