const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddleware');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

router.post('/get-doctor-info-by-user-id', authMiddlewares, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({ success: true, message: 'Doctor info fetched successfully', data: doctor });
  } catch (error) {
    res.status(500).send({ message: 'Error getting doctor info', success: false, error });
  }
});

router.post('/get-doctor-info-by-id', authMiddlewares, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({ success: true, message: 'Doctor info fetched successfully', data: doctor });
  } catch (error) {
    res.status(500).send({ message: 'Error getting doctor info', success: false, error });
  }
});

router.post('/update-doctor-profile', authMiddlewares, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body);
    res.status(200).send({ success: true, message: 'Doctor profile updated successfully', data: doctor });
  } catch (error) {
    res.status(500).send({ message: 'Error updating doctor profile', success: false, error });
  }
});

router.get('/get-appointments-by-doctor-id', authMiddlewares, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).send({ success: true, message: 'Appointments fetched successfully', data: appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching appointments', success: false, error });
  }
});

router.post('/change-appointment-status', authMiddlewares, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: 'changing-appointment-status',
      message: `Your appointment status has been ${status}`,
      onClickPath: '/appointments',
    });
    await user.save();
    res.status(200).send({ success: true, message: 'Appointment status changed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error changing appointment status', success: false, error });
  }
});

module.exports = router;
