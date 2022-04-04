import React, { useEffect, useState } from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import 'css/Navigation.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import up from 'components/parts/image/up3.png';
import left from 'components/parts/image/left3.png';
import right from 'components/parts/image/right3.png';
import logoutIcon from 'components/parts/image/logout.png';
import login from 'components/parts/image/login.png';

function MainNavigation() {
  const [auth] = useAuth();
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
    navigate('/main/');
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
        <SidebarFooter>
          <Menu>
            {!auth.isLoggedIn && (
              <div
                onClick={() => {
                  navigate('/accounts/login/');
                }}
                className="hover:text-lg"
              >
                <MenuItem icon={<img src={login} alt="들어오기" />}>
                  <h1 className="text-black">들어가기</h1>
                </MenuItem>
              </div>
            )}
            {auth.isLoggedIn && (
              <div onClick={handleLogout} className="hover:text-lg">
                <MenuItem icon={<img src={logoutIcon} alt="나가기" />}>
                  <h1 className="text-black">나가기</h1>
                </MenuItem>
              </div>
            )}
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
export default MainNavigation;
