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
  const [policlinics, setPoliclinics] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-doctors-by-filter', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        params: {
          status: 'approved',
          specialization: policlinics,
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
  }, [policlinics]);

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='page-title'>Approved Doctor List</h1>
        <Select
          allowClear
          showSearch
          style={{
            width: 200,
          }}
          placeholder='Search to Policlinics'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={listOfClinics}
          onChange={(value) => setPoliclinics(value)}
        />
      </div>

      <hr />
      <Row gutter={20}>
        {doctors.map((doctor, index) => (
          <Col key={index} span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
