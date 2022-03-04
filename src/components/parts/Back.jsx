import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { useEffect, useState } from 'react';
import ggumdoriClick from 'components/parts/image/ggumdoriClick.png';
import left from 'components/parts/image/left.png';
import right from 'components/parts/image/right.png';
import up from 'components/parts/image/up.png';
import { useNavigate } from 'react-router-dom';

function Back() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [goToTop, setGoToTop] = useState(0);

  useEffect(() => {
    setGoToTop((document.documentElement.scrollTop = 0));
  }, []);

  const moveToTop = () => {
    window.scrollTo({
      top: goToTop,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    moveToTop();
  }, [goToTop]);

  return (
    <>
      <div>
        <FloatingMenu
          slideSpeed={700}
          direction={Directions.Left}
          spacing={10}
          isOpen={open}
          className="z-10"
        >
          <MainButton
            iconResting={<img src={ggumdoriClick} alt="클릭버튼" />}
            iconActive={<img src={ggumdoriClick} alt="클릭버튼" />}
            background={ggumdoriClick}
            onClick={() => setOpen((prev) => !prev)}
            size={65}
          />
          <ChildButton
            icon={<img src={up} alt="위로가기" />}
            background="white"
            size={45}
            onClick={() => moveToTop()}
          />
          <ChildButton
            icon={<img src={right} alt="앞으로가기" />}
            background="white"
            size={45}
            onClick={() => navigate(1)}
          />
          <ChildButton
            icon={<img src={left} alt="뒤로가기" />}
            background="white"
            size={45}
            onClick={() => navigate(-1)}
          />
        </FloatingMenu>
      </div>
    </>
  );
}

export default Back;
