const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
  {
    userId: { type: String, reqired: true },
    firstName: { type: String, reqired: true },
    lastName: { type: String, reqired: true },
    email: { type: String, reqired: true },
    phoneNumber: { type: String, reqired: true },
    website: { type: String, reqired: true },
    address: { type: String, reqired: true },
    specialization: { type: String, reqired: true },
    experience: { type: String, reqired: true },
    feePerCunsultation: { type: Number, reqired: true },
    consultationHours: { type: Object, reqired: true },
    fromTime: { type: String, reqired: true },
    toTime: { type: String, reqired: true },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model('doctor', doctorSchema);
module.exports = doctorModel;
