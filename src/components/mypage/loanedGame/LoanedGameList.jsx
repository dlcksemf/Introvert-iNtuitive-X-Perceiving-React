import NoListGame from '../NoListGame';
import LoanedGame from './LoanedGame';

function LoanedGameList({ loanedGameList }) {
  const filtered_list = loanedGameList
    ?.filter((game) => game.return_state === 'L')
    .slice(0, 3);

  return (
    <div className="block w-full overflow-x-auto text-gray-800 select-none">
      {filtered_list?.length === 0 ? (
        <NoListGame>대여할 게임을 찾으러 가요!</NoListGame>
      ) : (
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                게임명
              </th>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                반납 시간
              </th>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                대여 상태
              </th>
              <th className="px-6 bg-gray-50 text-gray-800 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                반납 신청
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered_list?.map((game) => {
              return (
                <LoanedGame key={game?.loan_game_num.result} game={game} />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default LoanedGameList;
