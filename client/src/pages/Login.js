import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/login', values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.data.token);
        navigate('/');
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input size="large" placeholder='Email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input size="large" placeholder='Password' type='password' />
          </Form.Item>
          <div className='d-flex justify-content-between align-items-center'>
            <Link to='/register' className='anchor'>
              CLICK HERE TO REGISTER
            </Link>
            <Button className='primary-button my-3' htmlType='submit'>
              LOGIN
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
