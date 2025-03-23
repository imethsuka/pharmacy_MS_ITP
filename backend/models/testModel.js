import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { Medicine } from './medicineModel.js';

// Initialize mongoose-auto-increment
autoIncrement.initialize(mongoose.connection);

const testSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: Number, required: false, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    prescriptionID: { type: String, required: false },
    prescriptionUpDate: { type: Date, default: () => new Date() },
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true }],
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'checkout'], default: 'pending' },
    notes: { type: String },
    fileUrl: { type: String, required: false },
  },
  { timestamps: true }
);

testSchema.plugin(autoIncrement.plugin, {
  model: 'Test',
  field: 'prescriptionID',
  startAt: 1000,
  incrementBy: 1,
});

testSchema.plugin(autoIncrement.plugin, {
  model: 'Test',
  field: 'userId',
  startAt: 1,
  incrementBy: 1,
});

export const Test = mongoose.model('Test', testSchema);
