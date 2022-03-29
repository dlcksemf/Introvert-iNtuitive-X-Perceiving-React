import { useAuth } from 'base/hooks/Authcontext';
import { useReload } from 'base/hooks/ReloadContext';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'base/hooks/useFieldValues';

function ReturnBookModal({ book, updateState, handleClose }) {
  const [auth] = useAuth();
  const [, setReload] = useReload();
  const navigate = useNavigate();

  const handleClickSubmitButton = (e) => {
    e.preventDefault();
    if (window.confirm('반납하시겠습니까?')) {
      handleOkButton();
      alert('반납 되었습니다');
    } else {
      handleClose();
      alert('취소 되었습니다');
    }
  };

  const handleOkButton = () => {
    let today = new Date();
    const date = new Date(+new Date(today) + 3240 * 10000)
      .toISOString()
      .split('T')[0];

    updateState({
      data: { returned_date: date, return_state: 'R' },
    })
      .then(() => {
        handleClose();
        setReload(true);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.replace('/accounts/mypage/');
  };

  const handleCancleButton = (e) => {
    e.preventDefault();
    window.confirm('취소하시겠습니까?') && handleClose();
    // setGameReturn(false) && navigate('/accounts/mypage/');
  };

  const Item = ({ text }) => {
    return (
      <div>
        {text.split('\n').map((txt, index) => (
          <p key={index}>
            {txt}
            <br />
          </p>
        ))}
      </div>
    );
  };
  return (
    <div class="flex flex-col justify-center items-center">
      <div class="md:w-2/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
        <div class="flex justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <i class="fas fa-exclamation-circle text-blue-500"></i>
            <span class="font-bold text-gray-700 text-lg">
              대출/대여 반납 안내📢
            </span>
          </div>
          <div>
            <button>
              <i class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
            </button>
          </div>
        </div>

        <div class="px-10 py-5 text-gray-600 text-center">
          <Item
            text={
              '대출,대여의 반납은 사용자의 양심에 맡겨 따로 확인을 하지않습니다. \n 사용자가 실제 도서,보드게임을 반납하지 않고 \n 반납을 진행했을 시에는 불이익을 받을 수 있습니다. \n 다음 사용자를 위해 반드시 반납을 하고 아래 확인 버튼을 클릭해주세요!'
            }
          />
        </div>

        <div class="px-5 py-2 flex justify-end">
          <button
            class="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
            onClick={handleClickSubmitButton}
          >
            확인
          </button>
          <button
            class="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
            onClick={handleCancleButton}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReturnBookModal;
