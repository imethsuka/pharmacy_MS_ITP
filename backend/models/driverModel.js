import mongoose from 'mongoose';
import { driver } from '../models/driverModel.js';


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

export const driver = mongoose.model('driver', driverSchema);
