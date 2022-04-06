import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import Badge from 'designMaterials/Badge';
import PageReturnGameModal from 'pages/PageReturnGameModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoanedGame({ game }) {
  const [, setGameReturn] = useState(false);
  const [auth] = useAuth();
  const [, setReload] = useReload();
  const navigate = useNavigate();
  const [showReturn, setShowReturn] = useState(false);

  let today = new Date();
  const time = today.getHours() + ':' + today.getMinutes();

  const [color, setColor] = useState(() => {
    if (game.return_state === 'L') {
      if (new Date(game.return_due_time) < today) {
        return 'red';
      }
      return 'green';
    } else if (game.return_state === 'R') {
      return 'blue';
    }
  });

  const [, updateState] = useApiAxios(
    {
      url: `/game/api/loanedgame/${game.loan_game_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  //   const handleClickSubmitButton = (e) => {
  //     e.preventDefault();
  //     if (window.confirm('반납하시겠습니까?')) {
  //       handleOkButton();
  //       alert('반납 되었습니다');
  //     } else {
  //       handleCancleButton();
  //       alert('취소 되었습니다');
  //     }
  //     // <ReturnModal />;
  //     setGameReturn(true);
  //   };

  //   const handleOkButton = () => {
  //     updateState({ data: { return_state: 'R' } })
  //       .then(() => {
  //         setGameReturn(false);
  //         setReload(true);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     window.location.replace('/accounts/mypage/');
  //   };

  //   const handleCancleButton = () => {
  //     setGameReturn(false);
  //   };

  return (
    <React.Fragment>
      <tr>
        <td
          className="cursor-pointer hover:text-red-400"
          onClick={() => {
            navigate(`/game/${game.game_num}/`);
          }}
        >
          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
            {game.game_name.result}
          </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {game.return_due_time.replace('T', ' ').substring(0, 16)}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          <Badge color={color}>
            {game.return_state === 'L' && new Date(game.return_due_time) < today
              ? '연체중'
              : '대여중'}
            {game.return_state === 'R' && '반납 완료'}
          </Badge>
        </td>
        {/* {showReturn && <PageReturnModal updateState={updateState} />} */}
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {/* {game.return_state === 'L' && */}
          {game.return_state === 'L' && (
            // <Link
            //   to="/accounts/modal/return/"
            //   state={{ backgroundLocation: location }}
            //   updateState={updateState}
            // >
            <button onClick={() => setShowReturn(true)}>반납 신청</button>
            // </Link>
          )}

          {showReturn && (
            <PageReturnGameModal
              updateState={updateState}
              handleClose={() => setShowReturn(false)}
            />
          )}
          {/* {game.return_state === 'L' && (
            <Link
              to="/accounts/modal/return/"
              state={{ backgroundLocation: location }}
              updateState={updateState}
            >
              <button>반납 신청</button>
            </Link>
          )} */}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default LoanedGame;
