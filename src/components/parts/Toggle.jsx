import { EmptyHeart, FilledHeart } from 'designMaterials/WishesIcon';
import { useState } from 'react';

function Toggle() {
  const [wishes, setWishes] = useState(false);

  const handleClick = () => {
    console.log(`clicked`);
    setWishes(wishes === true ? <FilledHeart /> : <EmptyHeart />);
  };

  return (
    <div className="flex">
      <button onClick={handleClick}>
        {wishes === true ? <FilledHeart /> : <EmptyHeart />}
      </button>
    </div>
  );
}

export default Toggle;
