import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import non_image from 'components/parts/image/non_image.jpg';
import { toast } from 'react-toastify';
import GameToast from './GameToast';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';

function GameLoanedModal({ setModalIsOpen, modalIsOpen, game_num, reload }) {
  const [startDate] = useState(new Date());
  const [auth] = useAuth();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [isSelected, setIsSelected] = useState(true);

  const [{ data: game }, refetch] = useApiAxios({
    url: `/game/api/game/${game_num}/`,
    method: 'GET',
  });

  const [, saveLoanedGame] = useApiAxios(
    {
      url: `/game/api/loanedgame/`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const HandleSubmit = () => {
    var hours = ('0' + endTime.getHours()).slice(-2);
    var minutes = ('0' + endTime.getMinutes()).slice(-2);

    var timeString = hours + ':' + minutes;

    console.log(timeString);
    console.log(endTime);
    console.log(endTime.toLocaleTimeString());
    saveLoanedGame({
      data: {
        ...useFieldValues,
        game_name: game.game_num,
        user_id: auth.user_id,
        return_due_time: endTime,
        return_state: 'L',
      },
    })
      .then(() => {
        setModalIsOpen(false);
        reload();
        toast.success(<GameToast>대여</GameToast>, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          shouldCloseOnOverlayClick={false}
          className="h-[600px] w-[1320px] border-2 border-gray-400
          relative left-[100px] top-[142px] bg-white"
        >
          <h5 className="text-3xl font-bold select-none relative left-[40px] top-[30px]">
            게임 대여 신청
          </h5>
          <button
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setModalIsOpen(false)}
            className="relative bottom-[5px] left-[1245px] shadow-lg hover:text-red-600
                    border-double border-4 border-black h-[40px] w-[40px] hover:border-red-600"
          >
            X
          </button>

          <div className="relative top-[100px] left-[250px]">
            {game?.game_cover_photo && (
              <img
                src={game?.game_cover_photo}
                alt={game?.game_name.result}
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
            {!game?.game_cover_photo && (
              <img
                src={non_image}
                alt="non_image"
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
          </div>
          <div className="relative left-[500px] bottom-[160px]">
            <label className="font-bold relative bottom-[10px]">게임명</label>
            <div
              className="
                  border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative bottom-[5px]"
            >
              <h1 className="relative left-[10px] top-[5px]">
                {game?.game_name}
              </h1>
            </div>
            <label className="font-bold relative top-[5px]">대여 시간</label>
            <div
              className="
                  border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative top-[10px]"
            >
              <h1 className="relative left-[10px] top-[5px]">
                {startDate.getHours() > 12 ? (
                  <p>
                    오후 {startDate.getHours() - 12}시 {startDate.getMinutes()}
                    분
                  </p>
                ) : (
                  <p>
                    오전 {startDate.getHours()}시 {startDate.getMinutes()}분
                  </p>
                )}
              </h1>
            </div>
            <label className="font-bold relative top-[20px]">반납시간</label>
            <div
              className="border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative top-[25px]"
            >
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                locale={ko}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                minTime={startDate}
                maxTime={setHours(
                  setMinutes(new Date(), getMinutes(startDate)),
                  getHours(startDate) + 2,
                )} // 시작 시간부터 2시간
                excludeTimes={[
                  // 시작 시간 제외
                  startTime,
                  // 5:00 선택 기준 최대 7:00까지 예외처리
                  // setHours(setMinutes(new Date(), 0), 18),
                  // setHours(setMinutes(new Date(), 30), 18),
                  // setHours(setMinutes(new Date(), 0), 19),
                ]}
                timeCaption="Time"
                dateFormat="aa h시 mm분 종료"
                placeholderText="종료 시간"
                className="relative left-[10px] h-[35px] w-[450px] outline-none"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              data-bs-dismiss="modal"
              onClick={() => HandleSubmit()}
              className="relative bottom-[110px] left-[50px] shadow-lg
                    border-double border-4 border-sky-600 h-[50px] w-[100px] hover:border-sky-700"
            >
              대여
            </button>

            <button
              onClick={() => setModalIsOpen(false)}
              className="relative bottom-[110px] left-[120px] shadow-lg
                    border-double border-4 border-gray-400 h-[50px] w-[100px] hover:border-gray-500"
            >
              취소
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default GameLoanedModal;
