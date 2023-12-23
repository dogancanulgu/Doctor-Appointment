import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import Doctor from '../components/Doctor';
import { Col, Row, Select } from 'antd';
import { listOfClinics } from '../mock/LayoutMenu';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-approved-doctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='page-title'>Approved Doctor List</h1>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder='Search to Policlinics'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={listOfClinics}
        />
      </div>

      <hr />
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
