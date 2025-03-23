import mongoose from 'mongoose';

const testSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: false, // Optional, for guest users
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    prescriptionID: {
      type: String,
      required: true,
      unique: true,
    },
    prescriptionUpDate: {
      type: Date,
      default: () => new Date(),
    },
    medicines: {
      type: [String], // Array of medicine IDs (as strings)
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requiresPrescription: {
      type: Boolean,
      default: false, // Default to false, will be updated based on medicines
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Test = mongoose.model('Test', testSchema);