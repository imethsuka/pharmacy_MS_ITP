import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    DName: {
      type: String,
      required: true,
    },
    VehicleType: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
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
