import React, { useState } from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import 'css/Navigation.css';

import { HashLink, NavHashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';

function MainNavigation() {
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
    <div id="header">
      <ProSidebar
        collapsed={menuCollapse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon="🏠">
              <NavHashLink
                smooth
                activestyle={{ fontWeight: 'bold' }}
                to={'/#top'}
                className="hover:text-lg"
              >
                <h1 className="text-indigo-900">메인화면</h1>
              </NavHashLink>
            </MenuItem>

            <MenuItem icon="🏆">
              <HashLink smooth to={'/#rank'} className="hover:text-lg">
                <h1 className="text-indigo-900">인기도서</h1>
              </HashLink>
            </MenuItem>

            <MenuItem icon="😎">
              <HashLink smooth to={'/#top-reader'} className="hover:text-lg">
                <h1 className="text-indigo-900">다독왕</h1>
              </HashLink>
            </MenuItem>

            <MenuItem icon="🤩">
              <HashLink smooth to={'/#new-book'} className="hover:text-lg">
                <h1 className="text-indigo-900">신간도서</h1>
              </HashLink>
            </MenuItem>

            <MenuItem icon="🔍">
              <HashLink smooth to={'/#guide'} className="hover:text-lg">
                <h1 className="text-indigo-900">이용안내</h1>
              </HashLink>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon="🙋‍♀️">
              <div onClick={handleLogout} className="hover:text-lg">
                <h1 className="text-black">Log Out</h1>
              </div>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
export default MainNavigation;
