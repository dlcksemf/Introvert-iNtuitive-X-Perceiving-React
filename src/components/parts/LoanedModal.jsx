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

  const [, saveLoanedBook] = useApiAxios(
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
            도서 대출 신청
          </h5>
          <button
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setModalIsOpen(false)}
            className="relative bottom-[5px] left-[1245px] rounded font-bold text-white
                    border bg-black hover:bg-red-600 h-[40px] w-[40px]"
          >
            X
          </button>

          <div className="relative top-[100px] left-[250px]">
            {book?.cover_photo && (
              <img
                src={book?.cover_photo}
                alt={book?.title}
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
            {!book?.cover_photo && (
              <img
                src={non_image}
                alt="non_image"
                className="lg:w-[200px] w-full lg:h-2/6 h-64 object-cover object-center"
              />
            )}
          </div>
          <div className="relative left-[500px] bottom-[190px]">
            <label className="font-bold relative bottom-[10px]">
              도서 제목
            </label>
            <div
              className="
                  border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative bottom-[5px]"
            >
              <h1 className="relative left-[10px] top-[5px]">{book?.title}</h1>
            </div>
            <label className="font-bold relative top-[5px]">대출 시작일</label>
            <div
              className="
                  border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative top-[10px]"
            >
              <h1 className="relative left-[10px] top-[5px]">
                {startDate.getFullYear()}-{month}-{startDate.getDate()}
              </h1>
            </div>
            <label className="font-bold relative top-[20px]">대출 종료일</label>
            <div
              className="border-2 border-gray-400 rounded transition ease-in-out select-none
                  hover:text-black w-[500px] h-[40px] relative top-[25px]"
            >
              <DatePicker
                locale={ko}
                className="relative left-[10px] h-[35px] w-[450px] outline-none"
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
          <div className="flex justify-center">
            <button
              data-bs-dismiss="modal"
              onClick={() => HandleSubmit()}
              className="relative bottom-[145px] left-[50px] rounded font-bold text-white
                    border bg-indigo-600 h-[50px] w-[100px]"
            >
              대출
            </button>

            <button
              onClick={() => setModalIsOpen(false)}
              className="relative bottom-[145px] left-[120px] rounded font-bold
                    border bg-gray-300 h-[50px] w-[100px]"
            >
              취소
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LoanedModal;
