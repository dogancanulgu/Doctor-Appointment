import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DoctorForm from '../../components/DoctorForm';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        '/api/doctor/update-doctor-profile',
        {
          ...values,
          userId: user._id,
          timings: [dayjs(values.timings[0]).format('HH:mm'), dayjs(values.timings[1]).format('HH:mm')],
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/doctor/get-doctor-info-by-user-id',
        { userId: params.userId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      <h1 className='page-title'>Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}
    </Layout>
  );
};

export default Profile;
