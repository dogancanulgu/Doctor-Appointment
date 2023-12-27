import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Button, DatePicker, Select, Table } from 'antd';
import {
  listOfAppointmentStatus,
  listOfClinics,
  listOfDoctorStatus,
  listOfQuestionsAdmin,
  listOfQuestionsDoctor,
  listOfQuestionsUser,
} from '../mock/LayoutMenu';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import dayjs from 'dayjs';

const Reports = () => {
  const { user } = useSelector((state) => state.user);
  const listOfQuestionsByRole = user?.isAdmin
    ? listOfQuestionsAdmin
    : user?.isDoctor
    ? listOfQuestionsDoctor
    : listOfQuestionsUser;
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [policlinics, setPoliclinics] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState('approved');
  const [doctorStatus, setDoctorStatus] = useState('approved');
  const dispatch = useDispatch();

  const getAppointmentByDoctor = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-appointments-by-filter', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
        const appointments = response.data.data;
        const groupedAppointments = appointments.reduce((groups, appointment) => {
          const doctorId = appointment.doctorId;

          if (!groups[doctorId]) {
            groups[doctorId] = {
              doctorInfo: appointment.doctorInfo,
              appointments: [],
            };
          }

          groups[doctorId].appointments.push(appointment);

          return groups;
        }, {});

        // Her doktorun randevu sayısını ve doktor adı-soyadını içeren nesneleri oluştur
        const doctorAppointmentCounts = Object.values(groupedAppointments).map((group) => {
          const { doctorInfo, appointments } = group;

          return {
            doctorId: doctorInfo._id,
            doctorName: doctorInfo.firstName + ' ' + doctorInfo.lastName,
            specialization:
              listOfClinics.find((x) => x.value === doctorInfo.specialization)?.label ??
              doctorInfo.specialization,
            appointmentCount: appointments.length,
          };
        });
        const sortedDoctorAppointmentCounts = doctorAppointmentCounts.sort(
          (a, b) => b.appointmentCount - a.appointmentCount
        );

        setId('doctorId');
        setData(sortedDoctorAppointmentCounts);
        setColumn([
          {
            title: 'Doctor Name',
            dataIndex: 'doctorName',
            key: 'doctorName',
          },
          {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
          },
          {
            title: 'Appointments Count',
            dataIndex: 'appointmentCount',
            key: 'appointmentCount',
          },
        ]);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const getAppointmentByUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-appointments-by-filter', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
        const appointments = response.data.data;
        const groupedAppointments = appointments.reduce((groups, appointment) => {
          const userId = appointment.userId;

          if (!groups[userId]) {
            groups[userId] = {
              userInfo: appointment.userInfo,
              appointments: [],
            };
          }

          groups[userId].appointments.push(appointment);

          return groups;
        }, {});

        // Her kullanıcının randevu sayısını ve adını içeren nesneleri oluştur
        const userAppointmentCounts = Object.values(groupedAppointments).map((group) => {
          const { userInfo, appointments } = group;

          return {
            userId: userInfo._id,
            userName: userInfo.name,
            appointmentCount: appointments.length,
          };
        });
        const sortedUserAppointmentCounts = userAppointmentCounts.sort(
          (a, b) => b.appointmentCount - a.appointmentCount
        );

        setId('userId');
        setData(sortedUserAppointmentCounts);
        setColumn([
          {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
          },
          {
            title: 'Appointments Count',
            dataIndex: 'appointmentCount',
            key: 'appointmentCount',
          },
        ]);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const getAppointmentByPoliclinic = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-appointments-by-filter', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
        const appointments = response.data.data;
        const specializationCounts = {};

        // Her bir randevu için uzmanlığı kontrol et ve sayacı artır
        appointments.forEach((appointment) => {
          const specialization = appointment.doctorInfo.specialization;

          if (!specializationCounts[specialization]) {
            specializationCounts[specialization] = 1;
          } else {
            specializationCounts[specialization]++;
          }
        });

        // Her uzmanlığı ve sayısını içeren nesneleri oluştur
        const appointmentCountsList = Object.keys(specializationCounts).map((specialization) => ({
          specialization: listOfClinics.find((x) => x.value === specialization)?.label ?? specialization,
          appointmentCount: specializationCounts[specialization],
        }));
        const sortedAppointmentCountsList = appointmentCountsList.sort(
          (a, b) => b.appointmentCount - a.appointmentCount
        );

        setId('specialization');
        setData(sortedAppointmentCountsList);
        setColumn([
          {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
          },
          {
            title: 'Appointments Count',
            dataIndex: 'appointmentCount',
            key: 'appointmentCount',
          },
        ]);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const getDoctorsByPoliclinic = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-doctors-by-filter', {
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
        const doctors = response.data.data?.map((data) => ({
          ...data,
          specialization:
            listOfClinics.find((x) => x.value === data.specialization)?.label ?? data.specialization,
        }));
        const specializationCounts = doctors.reduce((counts, doctor) => {
          const specialization = doctor.specialization;
          const existingSpecialization = counts.find((item) => item.specialization === specialization);

          if (existingSpecialization) {
            existingSpecialization.doctorCount++;
          } else {
            counts.push({ specialization, _id: counts._id, doctorCount: 1 });
          }

          return counts;
        }, []);
        const sortedSpecializationCounts = specializationCounts.sort((a, b) => b.doctorCount - a.doctorCount);

        setId('_id');
        setData(sortedSpecializationCounts);
        setColumn([
          {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
          },
          {
            title: 'Doctor Count',
            dataIndex: 'doctorCount',
            key: 'doctorCount',
          },
        ]);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    if (questions === 'count_appointment_by_doctor') {
      getAppointmentByDoctor();
    } else if (questions === 'count_appointment_by_user') {
      getAppointmentByUser();
    } else if (questions === 'count_appointments_by_policlinic') {
      getAppointmentByPoliclinic();
    } else if (questions === 'count_doctor_by_policlinic') {
      getDoctorsByPoliclinic();
    }
  }, [questions, policlinics, from, to, appointmentStatus, doctorStatus]);

  const handlePrint = () => {
    const getColumn = {
      count_appointment_by_doctor: ['id', 'doctorName', 'specialization', 'appointmentCount'],
      count_appointment_by_user: ['id', 'userName', 'appointmentCount'],
      count_appointments_by_policlinic: ['id', 'specialization', 'appointmentCount'],
      count_doctor_by_policlinic: ['id', 'specialization', 'doctorCount'],
    };
    const getFilterName = {
      count_appointment_by_doctor: 'The report lists appointments by doctor.',
      count_appointment_by_user: 'The report lists appointments by user.',
      count_appointments_by_policlinic: 'The report lists appointments by policlinic.',
      count_doctor_by_policlinic: 'The report lists doctors by policlinic.',
    };
    const getLabel = {
      id: 'Id',
      doctorName: 'Doctor-Name',
      specialization: 'Specialization',
      appointmentCount: 'Appointment-Count',
      doctorCount: 'Doctor-Count',
      userName: 'User-Name',
    };

    const modifyData = (newArray) => {
      return newArray.map((objct, index) => {
        let newObjct = {};
        for (let key in objct) {
          if (objct.hasOwnProperty(key)) {
            newObjct[key] = String(objct[key]);
          }
        }
        return { ...newObjct, id: (index + 1).toString() };
      });
    };

    const createHeaders = (keys) => {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: getLabel[keys[i]],
          width: 80,
          align: 'center',
          padding: 0,
        });
      }
      return result;
    };

    var headers = createHeaders(getColumn[questions]);
    console.log(modifyData(data), headers);
    const doc = new jsPDF('p', 'mm', [297, 210]);
    doc.setFontSize(22);
    doc.text('Meet My Doctor', 80, 20);

    doc.setFontSize(16);
    doc.text(getFilterName[questions], 20, 30);
    let height = 40;
    if (
      policlinics &&
      [
        'count_appointment_by_doctor',
        'count_appointment_by_user',
        'count_appointments_by_policlinic',
      ].includes(questions)
    ) {
      doc.text(
        `Policlinic: ${listOfClinics.find((x) => x.value === policlinics)?.label ?? policlinics}`,
        20,
        height
      );
      height += 10;
    }
    if (
      appointmentStatus &&
      user?.isAdmin &&
      [
        'count_appointment_by_doctor',
        'count_appointment_by_user',
        'count_appointments_by_policlinic',
      ].includes(questions)
    ) {
      doc.text(
        `Appointment Status: ${
          listOfAppointmentStatus.find((x) => x.value === appointmentStatus)?.label ?? appointmentStatus
        }`,
        20,
        height
      );
      height += 10;
    }
    if (doctorStatus && user?.isAdmin && ['count_doctor_by_policlinic'].includes(questions)) {
      doc.text(
        `Doctor Status: ${
          listOfDoctorStatus.find((x) => x.value === doctorStatus)?.label ?? doctorStatus
        }`,
        20,
        height
      );
      height += 10;
    }
    if (
      from &&
      to &&
      [
        'count_appointment_by_doctor',
        'count_appointment_by_user',
        'count_appointments_by_policlinic',
      ].includes(questions)
    ) {
      doc.text(`Date From - To: ${from} - ${to}`, 20, height);
      height += 10;
    }
    doc.addImage('logo.png', 'JPEG', 155, 5, 30, 30);
    doc.table(20, height, modifyData(data), headers, { autoSize: true, margins: { top: 15, bottom: 10 } });
    doc.save('table.pdf');
  };
  // belirlenen iki tarih arasında en çok hangi polikliniğe randevu talep edilmiş
  // belirlenen iki tarih arasında en çok hangi poliklinikte hasta takibi yapılmış
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='page-title'>Reports</h1>

        <Button disabled={!questions} onClick={handlePrint} type='primary' danger>
          Export to PDF
        </Button>
      </div>
      <hr />
      <div style={{ display: 'flex', gap: '15px', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <Select
          allowClear
          showSearch
          style={{ width: 400 }}
          placeholder='Choose the question'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          // filterSort={(optionA, optionB) =>
          //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          // }
          options={listOfQuestionsByRole}
          // defaultValue={'count_appointment_by_doctor'}
          onChange={(value) => setQuestions(value)}
        />
        {[
          'count_appointment_by_doctor',
          'count_appointment_by_user',
          'count_appointments_by_policlinic',
        ].includes(questions) && (
          <Select
            allowClear
            showSearch
            style={{ width: 200 }}
            placeholder='Search to Policlinics'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={listOfClinics}
            defaultValue={policlinics}
            onChange={(value) => setPoliclinics(value)}
          />
        )}
        {user?.isAdmin &&
          [
            'count_appointment_by_doctor',
            'count_appointment_by_user',
            'count_appointments_by_policlinic',
          ].includes(questions) && (
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder='Search to Appointment Status'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
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
          )}
        {user?.isAdmin && ['count_doctor_by_policlinic'].includes(questions) && (
          <Select
            allowClear
            showSearch
            style={{ width: 200 }}
            placeholder='Search to Doctor Status'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={listOfDoctorStatus}
            defaultValue={doctorStatus}
            onChange={(value) => setDoctorStatus(value)}
          />
        )}
        {[
          'count_appointment_by_doctor',
          'count_appointment_by_user',
          'count_appointments_by_policlinic',
        ].includes(questions) && (
          <DatePicker.RangePicker
            format='DD-MM-YYYY'
            onChange={(value) => {
              console.log(value);
              const [newFrom, newTo] = value ?? [];
              setFrom(newFrom ? dayjs(newFrom).format('DD-MM-YYYY') : null);
              setTo(newTo ? dayjs(newTo).format('DD-MM-YYYY') : null);
            }}
          />
        )}
      </div>

      {questions && <Table rowKey={id} columns={column} dataSource={data} />}
    </Layout>
  );
};

export default Reports;
