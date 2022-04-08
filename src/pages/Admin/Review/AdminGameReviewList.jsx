import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminGameReviewList({ review, reload }) {
  const [, setReviewDelete] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [, deleteReview, refresh] = useApiAxios(
    {
      url: `/game/api/gamereview/${review.game_review_num}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      handleOkButton();
      alert('삭제되었습니다.');
      deleteReview().then(() => {
        reload();
      });
    } else {
      handleCancleButton();
      alert('취소되었습니다.');
    }
    setReviewDelete(true);
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleOkButton = () => {
    setReviewDelete(true);
  };

  const handleCancleButton = () => {
    setReviewDelete(false);
  };

  return (
    <React.Fragment>
      <td className="flex items-center"></td>
      <td className="">
        <div className="flex items-center cursor-pointer">
          <p className="text-sm leading-none text-gray-600">
            {review.username}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {review.game_review_content?.slice(0, 30)}
          </p>
        </div>
      </td>
      {/* <td className="pl-7">
        <div className="flex items-center">
          <p className="text-sm leading-none text-gray-600 ml-2">
            {review.created_at?.slice(0, 10)}
          </p>
        </div>
      </td> */}
      <td className="pl-7">
        <div className="flex items-center">
          <p
            className="text-sm leading-none text-gray-600 ml-2 cursor-pointer hover:text-red-400"
            onClick={() => {
              navigate(`/game/${review.game_num}/`);
            }}
          >
            {review.game_name}
          </p>
        </div>
      </td>
      <td className="pl-7">
        <div className="flex items-center">
          <button
            onClick={handleDelete}
            className={`cursor-pointer py-3 px-3 text-xs focus:outline-none leading-none text-red-700 bg-red-100 rounded`}
          >
            삭제
          </button>
        </div>
      </td>
    </React.Fragment>
  );
}
export default AdminGameReviewList;
