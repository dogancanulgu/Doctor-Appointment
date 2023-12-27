const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const authMiddlewares = require('../middlewares/authMiddleware');
const moment = require('moment');

router.get('/get-all-doctors', authMiddlewares, async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      Object.assign(query, { status: req.query.status });
    }
    if (req.query.specialization) {
      Object.assign(query, { specialization: req.query.specialization });
    }
    const doctors = await Doctor.find(query);
    res.status(200).send({ success: true, message: 'Doctors fetched successfully', data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching all doctors', success: false, error });
  }
});

router.get('/get-all-users', authMiddlewares, async (req, res) => {
  try {
    const query = {};
    if (req.query.isAdmin) {
      Object.assign(query, { isAdmin: req.query.isAdmin });
    }
    if (req.query.isDoctor) {
      Object.assign(query, { isDoctor: req.query.isDoctor });
    }
    const users = await User.find(query);
    res.status(200).send({ success: true, message: 'Users fetched successfully', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching all users', success: false, error });
  }
});

router.get('/get-all-appointments', authMiddlewares, async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      Object.assign(query, { status: req.query.status });
    }
    if (req.query.specialization) {
      Object.assign(query, { 'doctorInfo.specialization': req.query.specialization });
    }
    if (req.query.from && req.query.to) {
      const from = moment(req.query.from, 'DD-MM-YYYY').toISOString();
      const to = moment(req.query.to, 'DD-MM-YYYY').toISOString();
      Object.assign(query, { date: { $gte: from, $lte: to } });
    }
    const appointments = await Appointment.find(query);
    res.status(200).send({ success: true, message: 'Appointments fetched successfully', data: appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching appointments', success: false, error });
  }
});

router.post('/change-doctor-status', authMiddlewares, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });

    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: 'changing-doctor-status',
      message: `Your doctor account has been ${status}`,
      // onClickPath: '/notifications',
    });
    user.isDoctor = status === 'approved';
    await user.save();
    res.status(200).send({ success: true, message: 'Doctor status updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error changing doctor status', success: false, error });
  }
});

module.exports = router;
