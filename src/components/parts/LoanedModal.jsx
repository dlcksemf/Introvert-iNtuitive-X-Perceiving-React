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

function LoanedModal({ setModalIsOpen, modalIsOpen, book_num, reload }) {
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
        reload();
        toast.success(<BookToast>대출</BookToast>, {
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
  }, []);

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
                    대출 신청
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
                  hover:bg-purple-700 hover:shadow-lg
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
                    {book?.cover_photo && (
                      <img
                        src={book?.cover_photo}
                        alt={book?.title}
                        className="w-2/3 h-2/3 object-scale-down object-center inline-block rounded-full
                        transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100 "
                      />
                    )}
                    {!book?.cover_photo && (
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
                  select-none
                  hover:text-black"
                      placeholder="{book.title}"
                    >
                      {book?.title}
                    </p>
                    <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <div>
                        <label className="font-bold">대출 시작일</label>
                        <p className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 select-none hover:text-black">
                          {startDate.getFullYear()}-{month}-
                          {startDate.getDate()}
                        </p>
                      </div>
                      <div>
                        <label className="font-bold">대출 종료일</label>
                        <DatePicker
                          locale={ko}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 cursor-pointer hover:border-blue-500 hover:text-black"
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
                      <div className="flex justify-center mt-10">
                        <button
                          type="button"
                          className="px-10
          py-4
          mr-6
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
          hover:scale-110 transition duration-500 
          ease-in-out hover:-translate-y-1 rounded-full"
                          data-bs-dismiss="modal"
                          onClick={() => HandleSubmit()}
                        >
                          대출
                        </button>
                        <button
                          type="button"
                          className="px-10
      py-4
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
      hover:scale-110 transition duration-500 
      ease-in-out hover:-translate-y-1 rounded-full"
                          onClick={() => setModalIsOpen(false)}
                        >
                          취소
                        </button>
                      </div>
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

export default LoanedModal;
