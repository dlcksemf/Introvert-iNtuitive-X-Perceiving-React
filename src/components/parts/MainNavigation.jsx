import React, { useEffect, useState } from 'react';

import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import 'css/Navigation.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import up from 'components/parts/image/up.png';
import left from 'components/parts/image/left.png';
import right from 'components/parts/image/right.png';

function MainNavigation() {
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

  const navigate = useNavigate();

  const [, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [menuCollapse, setMenuCollapse] = useState(true);

  const handleMouseEnter = () => {
    setMenuCollapse(false);
  };

  const handleMouseLeave = () => {
    setMenuCollapse(true);
  };

  return (
    <div id="header" className="mt-2 hidden sm:flex">
      <ProSidebar
        collapsed={menuCollapse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarContent>
          <Menu>
            <div
              activestyle={{ fontWeight: 'bold' }}
              onClick={() => moveToTop()}
              className="hover:text-lg scroll-smooth"
            >
              <MenuItem icon={<img src={up} alt="위" />}>
                <h1 className="text-indigo-900 select-none">위로가기</h1>
              </MenuItem>
            </div>

            <div onClick={() => navigate(-1)} className="hover:text-lg">
              <MenuItem icon={<img src={left} alt="뒤" />}>
                <h1 className="text-indigo-900 select-none">뒤로가기</h1>
              </MenuItem>
            </div>

            <div onClick={() => navigate(1)} className="hover:text-lg">
              <MenuItem icon={<img src={right} alt="앞" />}>
                <h1 className="text-indigo-900 select-none">앞으로가기</h1>
              </MenuItem>
            </div>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}
export default MainNavigation;
