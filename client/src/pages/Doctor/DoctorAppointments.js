import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
import { listOfAppointmentStatus } from '../../mock/LayoutMenu';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/doctor/change-appointment-status',
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: 'Patient',
      dataIndex: 'name',
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: 'Patient Email',
      dataIndex: 'patientEmail',
      render: (text, record) => <span>{record.userInfo.email}</span>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span>{listOfAppointmentStatus.find((x) => x.value === record.status)?.label ?? record.status}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' && (
            <div className='d-flex'>
              <h1 className='anchor px-2' onClick={() => changeAppointmentStatus(record, 'approved')}>
                Approve
              </h1>
              <h1 className='anchor' onClick={() => changeAppointmentStatus(record, 'rejected')}>
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <hr />
      <Table rowKey='_id' columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default DoctorAppointments;
