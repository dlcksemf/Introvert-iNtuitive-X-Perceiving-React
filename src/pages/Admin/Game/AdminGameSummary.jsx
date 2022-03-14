// import { Link } from 'react-router-dom';

function AdminGameSummary({ game }) {
  return (
    <div className="m-auto px-4 py-4 max-w-xl">
      <div className="bg-gray-100 hover:bg-blue-100 border-gray-100 border-2 rounded-lg overflow-hidden mb-10">
        {/* {game.cover_photo && (
          <Link to={`/admin/${game.game_num}/`}> */}
        <img
          src={game.game_cover_photo}
          alt={game.game_name}
          className="w-full"
        />
        {/* </Link>
        )} */}
        {/* {!game?.cover_photo && (
          <Link to={`/admin/${game.book_num}/`}>
            <img src={non_image} alt={game.} className="w-full" />
          </Link>
        )} */}
        <div className="p-8 sm:p-9 md:p-7 xl:p-9">
          <h3 className="font-semibold text-dark text-center">
            {/* <Link to={`/admin/${game.book_num}/`}> */}
            {game.game_name}
            {/* </Link> */}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default AdminGameSummary;
