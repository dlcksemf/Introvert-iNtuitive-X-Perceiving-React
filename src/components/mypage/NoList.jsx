import { NavLink } from 'react-router-dom';

function NoList({ children }) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="my-7 text-xl font-semibold text-base text-blueGray-700">
        {children}
      </div>
      <NavLink
        className="bg-yellow-500 mt-3 text-white hover:bg-amber-500 text-sm font-bold uppercase px-3 py-1 rounded-full
      transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 underline-offset-4 mb-10"
        to="/books/booklist/"
      >
        도서 목록으로!
      </NavLink>
      <div className="h-7"></div>
    </div>
  );
}

export default NoList;
