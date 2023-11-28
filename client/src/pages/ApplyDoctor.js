import React from 'react';
import Layout from '../components/Layout';
import DoctorForm from '../components/DoctorForm';

const ApplyDoctor = () => {
  const onFinish = () => {
    console.log('request');
  };
  return (
    <Layout>
      <h1 className='page-title'>Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyDoctor;
