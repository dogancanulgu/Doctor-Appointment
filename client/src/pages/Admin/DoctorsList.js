import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Select, Table } from 'antd';
import toast from 'react-hot-toast';
import moment from 'moment';
import { listOfClinics, listOfDoctorStatus } from '../../mock/LayoutMenu';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorStatus, setDoctorStatus] = useState(null);
  const [policlinics, setPoliclinics] = useState(null);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/admin/get-all-doctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        params: {
          status: doctorStatus,
          specialization: policlinics,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/admin/change-doctor-status',
        { doctorId: record._id, userId: record.userId, status },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error('Error changing doctor status');
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, [doctorStatus, policlinics]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span className='normal-text'>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      render: (text, record) => (
        <span>
          {listOfClinics.find((x) => x.value == record.specialization)?.label ?? record.specialization}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span>{listOfDoctorStatus.find((x) => x.value === record.status)?.label ?? record.status}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' && (
            <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'approved')}>
              Approve
            </h1>
          )}
          {record.status === 'approved' && (
            <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'blocked')}>
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 className='page-title'>Doctors List</h1>
        <Select
          allowClear
          showSearch
          style={{ width: 200 }}
          placeholder='Search to Policlinics'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={listOfClinics}
          defaultValue={policlinics}
          onChange={(value) => setPoliclinics(value)}
        />
        <Select
          allowClear
          showSearch
          style={{ width: 200 }}
          placeholder='Search to Doctor Status'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={listOfDoctorStatus}
          defaultValue={doctorStatus}
          onChange={(value) => setDoctorStatus(value)}
        />
      </div>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default DoctorsList;
