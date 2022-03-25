import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { addMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import non_image from 'components/parts/image/non_image.jpg';
import { toast } from 'react-toastify';
import BookToast from './BookToast';
import GameToast from './GameToast';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import { addHours } from 'date-fns';

function GameLoanedModal({ setModalIsOpen, modalIsOpen, game_num, reload }) {
  const [startDate] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  const [auth] = useAuth();
  // const endDay = new Date(+new Date(endDate) + 3240 * 10000)
  //   .toISOString()
  //   .split('T')[0];

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [isSelected, setIsSelected] = useState(true);

  // const onSelect = (time) => {
  //   setStartTime(time);
  //   setIsSelected(true);
  //   setEndTime(null);
  // };

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

  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);

  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto overflow-hidden"
        id="exampleModalLg"
        tabIndex="-1"
        aria-labelledby="exampleModalLgLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-3xl font-bold leading-normal text-gray-800 select-none mt-12 ml-4">
                    대여 신청
                  </h5>
                  <button
                    type="button"
                    className="px-4
                    py-3
                    mr-4
                    mt-12
                    bg-gray-500
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-gray-400 hover:shadow-lg
                    hover:scale-110 rounded-full
                    transition duration-500 ease-in-out hover:-translate-y-1"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModalIsOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="modal-body relative p-4 ml-60">
                    {game?.game_cover_photo && (
                      <img
                        src={game?.game_cover_photo}
                        alt={game?.game_name}
                        className="w-2/3 h-2/3 object-scale-down object-center inline-block rounded-full
                          transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100 "
                      />
                    )}
                    {!game?.game_cover_photo && (
                      <img
                        src={non_image}
                        alt="non_image"
                        className="w-2/3 h-2/3 object-scale-down object-center inline-block rounded-full
                          transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100 "
                      />
                    )}
                  </div>
                  <div className="mr-60">
                    <label htmlFor="floatingInput" className="font-bold">
                      게임명
                    </label>
                    <p
                      className="form-control
                    block
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    select-none
                    hover:text-black
                    mb-3
                    mt-1"
                      placeholder="{game.results.game_name}"
                    >
                      {game?.game_name}
                    </p>

                    <div>
                      <label className="font-bold">대여 시간</label>
                    </div>
                    <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <div>
                        {startDate.getHours() > 12 ? (
                          <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                            오후 {startDate.getHours() - 12}시{' '}
                            {startDate.getMinutes()}분
                          </p>
                        ) : (
                          <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                            오전 {startDate.getHours()}시{' '}
                            {startDate.getMinutes()}분
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      {' '}
                      <label className="font-bold">반납 시간</label>
                    </div>

                    <div>
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
                        className="mt-3 orm-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black"
                      />
                    </div>
                    {/* <DatePicker
                      locale={ko}
                      className="outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 cursor-pointer hover:border-blue-500 hover:text-black"
                      selected={endTime}
                      onChange={(time) => setEndTime(time)}
                      // showTimeSelect
                      // showTimeSelectOnly
                      startTime={startTime}
                      endTime={endTime}
                      minTime={startTime}
                      maxTime={setHours(
                        setMinutes(new Date(), getMinutes(startTime)),
                        getHours(startTime) + 2,
                      )}
                      isClearable={true}
                      dateFormat="aa hh:mm 종료"
                      placeholderText="종료 시간"
                    /> */}

                    {/* <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <div>
                        {startDate.getHours() + 2 > 12 ? (
                          <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                            오후 {startDate.getHours() - 10}시{' '}
                            {startDate.getMinutes()}분
                          </p>
                        ) : (
                          <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                            오전 {startDate.getHours() - 10}시{' '}
                            {startDate.getMinutes()}분
                          </p>
                        )}
                      </div>
                    </div> */}
                    {/* <div>
                      <label className="font-bold">반납 시간</label>
                      <div>
                        <input
                          type="time"
                          name="time"
                          step="3600"
                          value={game.return_due_time}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black"
                        />
                      </div>
                    </div> */}
                    {/* <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <div>
                        <label className="font-bold">대출 시작 시간</label>
                        <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                          {startDate.getHours()}시 {startDate.getMinutes()}분
                         
                        </p>
                      </div>
                      <div>
                        <label className="font-bold">반납 시간</label>
                        <div>
                          <input
                            type="time"
                            name="time"
                            step="3600"
                            value={game.return_due_time}
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black"
                          />
                        </div>
                      </div> */}
                    {/* <div>
                      <DatePicker
                        selected={startTime}
                        onChange={onSelect}
                        locale={ko}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={10}
                        filterTime={filterPassedTime}
                        minTime={setHours(setMinutes(new Date(), 30), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                        timeCaption="Time"
                        dateFormat="aa h:mm 시작"
                        placeholderText="시작 시간"
                        className=" mt-1 orm-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black"
                      />
                    </div>
                    

                    {isSelected ? ( // 시작 시간을 선택해야 종료 시간 선택 가능
                      <div>
                        <DatePicker
                          selected={endTime}
                          onChange={(time) => setEndTime(time)}
                          locale={ko}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={10}
                          minTime={startTime}
                          maxTime={setHours(
                            setMinutes(new Date(), getMinutes(startTime)),
                            getHours(startTime) + 2,
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
                          dateFormat="aa h:mm 종료"
                          placeholderText="종료 시간"
                          className="mt-3 orm-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black"
                        />
                      </div>
                    ) : null} */}

                    <div className="flex justify-center mt-10">
                      <button
                        type="button"
                        className="px-10
            py-4
            mr-6
            bg-blue-600
            text-white
            font-semibold
            text-md
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            hover:scale-110 transition duration-500 
            ease-in-out hover:-translate-y-1 rounded-full"
                        data-bs-dismiss="modal"
                        onClick={() => HandleSubmit()}
                      >
                        대여
                      </button>
                      <button
                        type="button"
                        className="px-10
        py-4
        bg-gray-300
        text-black
        font-semibold
        text-md
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-indigo-200 hover:shadow-lg
        focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-purple-800 active:shadow-lg
        hover:scale-110 transition duration-500 
        ease-in-out hover:-translate-y-1 rounded-full"
                        onClick={() => setModalIsOpen(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GameLoanedModal;
