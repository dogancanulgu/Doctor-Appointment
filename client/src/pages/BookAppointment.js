import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { listOfClinics } from '../mock/LayoutMenu';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/doctor/get-doctor-info-by-id',
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/check-booking-availability',
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/appointments');
      }
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className='page-title'>
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className='mt-5' align='middle'>
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src='https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg'
                alt=''
                width='100%'
                height='400'
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className='normal-text'>
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Specialization : </b>
                {listOfClinics.find((x) => x.value == doctor.specialization)?.label ?? doctor.specialization}
              </p>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerCunsultation}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <p>
                <b>Days : </b>
                <b className='workdays'>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <b
                      key={index}
                      className={`day ${doctor.workingDays.includes(index + 1) ? 'working' : ''}`}
                    >
                      {day}
                    </b>
                  ))}
                </b>
              </p>
              <div className='d-flex flex-column pt-2 mt-2'>
                <DatePicker
                  format='DD-MM-YYYY'
                  disabledDate={(current) => {
                    return (
                      (current && current < dayjs().endOf('day')) ||
                      !doctor?.workingDays?.includes(dayjs(current).isoWeekday())
                    );
                  }}
                  onChange={(value) => {
                    setDate(dayjs(value).format('DD-MM-YYYY'));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format='HH:mm'
                  className='mt-3'
                  minuteStep={15}
                  hideDisabledOptions={true}
                  disabledTime={() => {
                    return {
                      disabledHours: () =>
                        [...Array(24).keys()].filter(
                          (hour) =>
                            hour < doctor.timings[0].split(':')[0] || doctor.timings[1].split(':')[0] < hour
                        ),
                      disabledMinutes: (hour) => {
                        let minutes = [];
                        const [firstHour, firstMinutes] = doctor.timings[0].split(':');
                        const [secondHour, secondMinutes] = doctor.timings[1].split(':');
                        if (hour == firstHour && hour == secondHour) {
                          minutes = [0, 15, 30, 45].filter(
                            (minute) => minute < firstMinutes && secondMinutes < minute
                          );
                        } else if (hour == firstHour) {
                          minutes = [0, 15, 30, 45].filter((minute) => minute < firstMinutes);
                        } else if (hour == secondHour) {
                          minutes = [0, 15, 30, 45].filter((minute) => secondMinutes < minute);
                        }
                        return minutes;
                      },
                    };
                  }}
                  // disabledHours={() => [1, 2, 3]}
                  // disabledHours={() =>
                  //   [...Array(24).keys()].filter(
                  //     (hour) =>
                  //       hour < doctor.timings[0].split(':')[0] || doctor.timings[1].split(':')[0] < hour
                  //   )
                  // }
                  // disabledMinutes={(hour) => {
                  //   let minutes = [];
                  //   const [firstHour, firstMinutes] = doctor.timings[0].split(':');
                  //   const [secondHour, secondMinutes] = doctor.timings[1].split(':');
                  //   if (hour == firstHour && hour == secondHour) {
                  //     minutes = [0, 15, 30, 45].filter(
                  //       (minute) => minute < firstMinutes && secondMinutes < minute
                  //     );
                  //   } else if (hour == firstHour) {
                  //     minutes = [0, 15, 30, 45].filter((minute) => minute < firstMinutes);
                  //   } else if (hour == secondHour) {
                  //     minutes = [0, 15, 30, 45].filter((minute) => secondMinutes < minute);
                  //   }
                  //   return minutes;
                  // }}
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(dayjs(value).format('HH:mm'));
                  }}
                />
                {!isAvailable && (
                  <Button className='primary-button mt-3 full-width-button' onClick={checkAvailability}>
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button className='primary-button mt-3 full-width-button' onClick={bookNow}>
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
