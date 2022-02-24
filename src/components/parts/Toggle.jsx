import { useApiAxios } from 'base/api/base';
import { EmptyHeart, FilledHeart } from 'designMaterials/WishesIcon';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Toggle({ book, wish, user_id, reload }) {
  let location = useLocation();

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
    makeWish({
      data: { book_name: book.book_num, user_id: user_id },
    }).then(() => {
      setWishes(true);
      reload();
    });
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
