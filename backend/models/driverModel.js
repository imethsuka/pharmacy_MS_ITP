import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    DName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    LicenseNumber: {
      type: String,
      required: true,
    },
    Availability: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const driver = mongoose.model('driver', driverSchema);
