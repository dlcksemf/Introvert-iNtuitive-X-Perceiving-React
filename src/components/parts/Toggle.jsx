import { useApiAxios } from 'base/api/base';
import { EmptyHeart, FilledHeart } from 'designMaterials/WishesIcon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

function Toggle({ book, wish, user_id, reload }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [wishes, setWishes] = useState(false);

  const [{}, makeWish] = useApiAxios(
    {
      url: `/books/api/wishes/`,
      method: 'POST',
    },
    { manual: true },
  );

  const [{}, deleteWish] = useApiAxios(
    {
      url: `/books/api/wishes/${wish?.wish_num}/`,
      method: 'DELETE',
    },
    { manual: true },
  );

  useEffect(() => {
    if (wish) {
      setWishes(true);
    } else setWishes(false);
  }, [wish]);

  const handleDelete = () => {
    deleteWish(
      {
        url: `/books/api/wishes/${wish?.wish_num}/`,
        method: 'DELETE',
      },
      { manual: true },
    ).then(() => {
      setWishes(false);
    });
  };

  const handleSave = () => {
    auth.isLoggedIn
      ? makeWish({
          data: { book_name: book.book_num, user_id: user_id },
        }).then(() => {
          setWishes(true);
          reload();
        })
      : window.confirm('로그인 후 이용해주세요🎈') &&
        navigate('/accounts/login/');
  };

  return (
    <div className="flex">
      {wishes ? (
        <div onClick={handleDelete}>
          <FilledHeart />
        </div>
      ) : (
        <div onClick={handleSave}>
          <EmptyHeart />
        </div>
      )}
    </div>
  );
}

export default Toggle;
