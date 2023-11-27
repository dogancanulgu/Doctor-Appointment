import React, { useState } from 'react';
import '../layout.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'ri-hospital-line',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-user-line',
    },
    {
      name: 'Logout',
      path: '/logout',
      icon: 'ri-logout-box-r-line',
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className='main p-2'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <h1>DU</h1>
          </div>
          <div className='menu'>
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  {!isCollapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>
        <div className='content'>
          <div className='header'>
            <i
              className={`${isCollapsed ? 'ri-menu-2-fill' : 'ri-close-fill'} header-action-icon`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            ></i>
            <div className='d-flex align-items-center px-4'>
              <i class='ri-notification-line header-action-icon px-3'></i>
              <Link className='anchor' to='/profile'>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
