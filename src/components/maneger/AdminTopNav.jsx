import React, { useState } from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import 'css/Navigation.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'base/hooks/Authcontext';
import { NavLink } from 'react-router-dom';

function AdminTopNav() {
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
            <MenuItem icon="👩‍🏫">
              <NavLink to={'/admin/loanedbook/'} className="hover:text-lg">
                <h1 className="text-indigo-900">대출 관리</h1>
              </NavLink>
            </MenuItem>

            <MenuItem icon="🎈">
              <NavLink to={'/admin/booklist/'} className="hover:text-lg">
                <h1 className="text-indigo-900">도서 관리</h1>
              </NavLink>
            </MenuItem>

            <MenuItem icon="🌞">
              <NavLink to={'/admin/user/'} className="hover:text-lg">
                <h1 className="text-indigo-900">회원 관리</h1>
              </NavLink>
            </MenuItem>

            <MenuItem icon="🍕">
              <NavLink to={'/admin/application/'} className="hover:text-lg">
                <h1 className="text-indigo-900">신청 관리</h1>
              </NavLink>
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
export default AdminTopNav;
