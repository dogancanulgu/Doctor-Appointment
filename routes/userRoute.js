const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddlewares = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({ message: 'User already exists', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res.status(200).send({ message: 'User created successfully.', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating user', success: false, error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: 'User does not exist', success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: 'Password is incorrect', success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).send({ message: 'Login successful', success: true, data: { token } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error logging in', success: false, error });
  }
});

router.post('/get-user-info-by-id', authMiddlewares, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({ message: 'User does not exist', success: false });
    } else {
      delete user.password;
      return res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error getting user info', success: false, error });
  }
});

router.post('/apply-doctor-account', authMiddlewares, async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: 'pending' });
    await newDoctor.save();

    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: 'new-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
      },
      onClickPath: '/admin/doctorslist',
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({ success: true, message: 'Doctor account applied successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error applying doctor account', success: false, error });
  }
});

router.post('/mark-unseen-notifications-as-seen', authMiddlewares, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    user.seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    await user.save()
    delete user.password;
    res.status(200).send({ success: true, message: 'All notifications marked as seen.', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error marking unseen notifications', success: false, error });
  }
});

router.post('/delete-seen-notifications', authMiddlewares, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    await user.save()
    delete user.password;
    res.status(200).send({ success: true, message: 'All notifications deleted.', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error deleting seen notifications', success: false, error });
  }
});

router.get('/get-all-approved-doctors', authMiddlewares, async (req, res) => {
  try {
    const doctors = await Doctor.find({status: "approved"});
    res.status(200).send({ success: true, message: 'Aprroved doctors fetched successfully', data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching all approved doctors', success: false, error });
  }
});

module.exports = router;
