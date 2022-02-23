import React, { useState } from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FaList, FaRegHeart } from 'react-icons/fa';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';

import 'react-pro-sidebar/dist/css/styles.css';
import 'css/Navigation.css';

import { HashLink, NavHashLink } from 'react-router-hash-link';

function MainNavigation() {
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
            <MenuItem active={true} icon={<FiHome />}>
              Home
            </MenuItem>

            <MenuItem icon={<FaList />}>
              <HashLink to={'/#top'}>Top</HashLink>
            </MenuItem>

            <MenuItem icon={<FaRegHeart />}>
              <NavHashLink
                smooth
                activeStyle={{ fontWeight: 'bold' }}
                to={'/#main'}
              >
                Main
              </NavHashLink>
            </MenuItem>

            <MenuItem icon={<RiPencilLine />}>
              <HashLink smooth to={'/#rank'}>
                Rank
              </HashLink>
            </MenuItem>

            <MenuItem icon={<BiCog />}>
              <HashLink smooth to={'/#top-reader'}>
                top-reader
              </HashLink>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
export default MainNavigation;
