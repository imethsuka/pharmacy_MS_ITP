import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicineCategory',
      required: true,
    },
    description: {
      type: String,
    },
    howToUse: {
      type: String,
    },
    sideEffects: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
    },
    batchExpiry: {
      type: Date,
      required: true,
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    supplierEmail: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Medicine = mongoose.model('Medicine', medicineSchema);
