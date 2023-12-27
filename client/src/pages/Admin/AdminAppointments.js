import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker, Select, Table } from 'antd';
import moment from 'moment';
import { listOfAppointmentStatus, listOfClinics } from '../../mock/LayoutMenu';
import dayjs from 'dayjs';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [policlinics, setPoliclinics] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/admin/get-all-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          status: appointmentStatus,
          specialization: policlinics,
          from: from,
          to: to,
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
      title: 'Doctor',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      render: (text, record) => (
        <span>
          {listOfClinics.find((x) => x.value == record.doctorInfo.specialization)?.label ??
            record.doctorInfo.specialization}
        </span>
      ),
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
  }, [policlinics, appointmentStatus, from, to]);

  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 className='page-title'>Appointments</h1>
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
          placeholder='Search to Appointment Status'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={listOfAppointmentStatus}
          defaultValue={appointmentStatus}
          onChange={(value) => {
            console.log(value);
            setAppointmentStatus(value);
          }}
        />
        <DatePicker.RangePicker
          format='DD-MM-YYYY'
          onChange={(value) => {
            console.log(value);
            const [newFrom, newTo] = value ?? [];
            setFrom(newFrom ? dayjs(newFrom).format('DD-MM-YYYY') : null);
            setTo(newTo ? dayjs(newTo).format('DD-MM-YYYY') : null);
          }}
        />
      </div>
      <hr />
      <Table rowKey='_id' columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default DoctorAppointments;
