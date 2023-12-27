import React from 'react';
import { useNavigate } from 'react-router-dom';
import { convertDaysToInteger, listOfClinics } from '../mock/LayoutMenu';

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div className='card p-2 cursor-pointer' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
      <h1 className='card-title'>
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Specialization : </b>
        {listOfClinics.find((x) => x.value == doctor.specialization)?.label ?? doctor.specialization}
      </p>
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Days : </b>
        <b className='workdays'>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <b key={index} className={`day ${doctor.workingDays.includes(index + 1) ? 'working' : ''}`}>
              {day}
            </b>
          ))}
        </b>
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
