import React, { useState } from 'react';
import '../layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminMenu, userMenu } from '../mock/LayoutMenu';
import { Badge } from 'antd';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='main p-2'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <h1 className='logo'>DU</h1>
          </div>
          <div className='menu'>
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.path} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  {!isCollapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className='d-flex menu-item' onClick={handleLogout}>
              <i className='ri-logout-circle-line'></i>
              {!isCollapsed && <Link to='/login'>Logout</Link>}
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='header'>
            <i
              className={`${isCollapsed ? 'ri-menu-2-fill' : 'ri-close-fill'} header-action-icon`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            ></i>
            <div className='d-flex align-items-center px-4'>
              <Badge count={user?.unseenNotifications?.length}>
                <i className='ri-notification-line header-action-icon px-3'></i>
              </Badge>
              <Link className='anchor mx-2' to='/profile'>
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
