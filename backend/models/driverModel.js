import mongoose from 'mongoose';

const driverSchema =  mongoose.Schema(
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
      type: String,
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

export const Driver = mongoose.model('Driver', driverSchema);
