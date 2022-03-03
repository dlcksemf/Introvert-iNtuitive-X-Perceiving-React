import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { useState } from 'react';
import Button from 'designMaterials/Button';

function Back() {
  //   const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative left-3/4">
        <FloatingMenu
          slideSpeed={500}
          direction={Directions.Up}
          spacing={8}
          isOpen={open}
        >
          <MainButton
            iconResting={
              <Button style={{ fontSize: 20 }} nativeColor="white" />
            }
            iconActive={<Button style={{ fontSize: 20 }} nativeColor="white" />}
            background="black"
            onClick={() => setOpen(true)}
            size={56}
          />
          <ChildButton
            icon={<Button style={{ fontSize: 20 }} />}
            background="white"
            size={40}
            onClick={() => console.log('First button clicked')}
          />
          <ChildButton
            icon={<Button style={{ fontSize: 20 }} />}
            background="white"
            size={40}
          />
          <ChildButton
            icon={<Button style={{ fontSize: 20 }} />}
            background="white"
            size={40}
          />
        </FloatingMenu>
      </div>
    </>
  );
}

export default Back;
