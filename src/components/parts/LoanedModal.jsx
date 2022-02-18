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

function LoanedModal({ setModalIsOpen, modalIsOpen, book_num }) {
  const [startDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
  const [auth] = useAuth();
  const endDay = new Date(+new Date(endDate) + 3240 * 10000)
    .toISOString()
    .split('T')[0];

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const [{ data: book }, refetch] = useApiAxios({
    url: `/books/api/books/${book_num}/`,
    method: 'GET',
  });

  const [{}, saveLoanedBook] = useApiAxios(
    {
      url: `/books/api/loanedbooks/`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const HandleSubmit = () => {
    saveLoanedBook({
      data: {
        ...useFieldValues,
        book_name: book.book_num,
        user_id: auth.user_id,
        return_due_date: endDay,
        return_state: 'L',
      },
    })
      .then(() => {
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
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
                  <h5 className="text-xl font-medium leading-normal text-gray-800">
                    대출 신청
                  </h5>
                  <button
                    type="button"
                    className="px-2
                  py-1.5
                  bg-gray-400
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-gray-500 hover:shadow-lg
                  focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-gray-600 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModalIsOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="modal-body relative p-4">
                    <label
                      htmlFor="floatingInput"
                      className="text-gray-700 font-bold"
                    >
                      도서 사진
                    </label>
                    {book?.cover_photo && (
                      <img
                        src={book?.cover_photo}
                        alt={book?.title}
                        className="rounded-full"
                      />
                    )}
                    {!book?.cover_photo && (
                      <img
                        src={non_image}
                        alt="non_image"
                        className="rounded-full m-auto"
                      />
                    )}
                    <label
                      htmlFor="floatingInput"
                      className="text-gray-700 font-bold"
                    >
                      도서 제목
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="{book.title}"
                    >
                      {book?.title}
                    </p>
                    <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <div>
                        <label className="font-bold">대출 시작일</label>
                        <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                          {startDate.getFullYear()}-{month}-
                          {startDate.getDate()}
                        </p>
                      </div>
                      <div>
                        <label className="font-bold">대출 종료일</label>
                        <DatePicker
                          locale={ko}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          // selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          maxDate={addMonths(new Date(), 1)}
                          isClearable={true}
                          dateFormat="yyyy-MM-dd"
                          dateFormatCalendar="yyyy년 MM월"
                          filterDate={isWeekday}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="float-right">
                  <button
                    type="button"
                    className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => HandleSubmit()}
                  >
                    대출
                  </button>
                  <button
                    type="button"
                    className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
                    onClick={() => setModalIsOpen(false)}
                  >
                    취소
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoanedModal;
