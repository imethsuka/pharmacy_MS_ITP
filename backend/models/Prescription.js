import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Prescription', prescriptionSchema);