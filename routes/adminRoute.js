const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const authMiddlewares = require('../middlewares/authMiddleware');

router.get('/get-all-doctors', authMiddlewares, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({ success: true, message: 'Doctors fetched successfully', data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching all doctors', success: false, error });
  }
});

router.get('/get-all-users', authMiddlewares, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ success: true, message: 'Users fetched successfully', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching all users', success: false, error });
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
    user.isDoctor = status === "approved"
    await user.save();
    res.status(200).send({ success: true, message: 'Doctor status updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error changing doctor status', success: false, error });
  }
});

module.exports = router;
