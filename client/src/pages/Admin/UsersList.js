import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/admin/get-all-users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        params: {
          isAdmin: false,
          isDoctor: false,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='page-header'>Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default UsersList;
