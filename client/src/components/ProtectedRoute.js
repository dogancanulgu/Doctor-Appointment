import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/get-user-info-by-id',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return localStorage.getItem('token') ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
