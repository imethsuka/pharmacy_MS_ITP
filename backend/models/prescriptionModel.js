import mongoose from 'mongoose';

const prescriptionSchema = mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    userId: {
      type: String,
      required: false, // Can be required if user authentication exists
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
