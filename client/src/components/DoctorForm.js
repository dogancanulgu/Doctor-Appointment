import { Button, Checkbox, Col, Form, Input, Row, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { listOfClinics } from '../mock/LayoutMenu';

function DoctorForm({ onFinish, initivalValues }) {
  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [dayjs(initivalValues?.timings[0], 'HH:mm'), dayjs(initivalValues?.timings[1], 'HH:mm')],
        }),
      }}
    >
      <h1 className='card-title mt-3'>Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='First Name' name='firstName' rules={[{ required: true }]}>
            <Input size='large' placeholder='First Name' />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Last Name' name='lastName' rules={[{ required: true }]}>
            <Input size='large' placeholder='Last Name' />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Phone Number' name='phoneNumber' rules={[{ required: true }]}>
            <Input size='large' placeholder='Phone Number' />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Website' name='website' rules={[{ required: true }]}>
            <Input size='large' placeholder='Website' />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Address' name='address' rules={[{ required: true }]}>
            <Input size='large' placeholder='Address' />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className='card-title mt-3'>Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Specialization' name='specialization' rules={[{ required: true }]}>
            <Select
              size='large'
              showSearch
              placeholder='Search to Policlinics'
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={listOfClinics}
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Experience' name='experience' rules={[{ required: true }]}>
            <Input size='large' placeholder='Experience' type='number' min={0} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Fee Per Cunsultation'
            name='feePerCunsultation'
            rules={[{ required: true }]}
          >
            <Input size='large' placeholder='Fee Per Cunsultation' type='number' min={0} />
          </Form.Item>
        </Col>
        <Col span={8} xs={48} sm={48} lg={16}>
          <Form.Item required label='Days' name='workingDays' rules={[{ required: true }]}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Checkbox value={1}>Monday</Checkbox>
              <Checkbox value={2}>Tuesday</Checkbox>
              <Checkbox value={3}>Wednesday</Checkbox>
              <Checkbox value={4}>Thursday</Checkbox>
              <Checkbox value={5}>Friday</Checkbox>
              <Checkbox value={6}>Saturday</Checkbox>
              <Checkbox value={7}>Sunday</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label='Timings' name='timings' rules={[{ required: true }]}>
            <TimePicker.RangePicker size='large' format='HH:mm' minuteStep={15} />
          </Form.Item>
        </Col>
      </Row>

      <div className='d-flex justify-content-end'>
        <Button className='primary-button' htmlType='submit'>
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
