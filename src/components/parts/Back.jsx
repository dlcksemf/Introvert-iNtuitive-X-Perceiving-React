import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { useEffect, useState } from 'react';
import click from 'components/parts/image/click.png';
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
      <div className="relative flex justify-end mr-4">
        <FloatingMenu
          slideSpeed={700}
          direction={Directions.Left}
          spacing={8}
          isOpen={open}
        >
          <MainButton
            iconResting={<img src={click} />}
            iconActive={<img src={click} />}
            background={click}
            onClick={() => setOpen(true)}
            size={65}
            className="transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-110"
          />
          <ChildButton
            icon={<img src={up} />}
            background="white"
            size={45}
            onClick={() => moveToTop()}
          />
          <ChildButton
            icon={<img src={right} />}
            background="white"
            size={45}
            onClick={() => navigate(1)}
          />
          <ChildButton
            icon={<img src={left} />}
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
