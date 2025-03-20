import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'MedicineCategory',
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    howToUse: {
      type: String,
      required: true,
    },
    sideEffects: {
      type: String,
      required: true,
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
      required: true,
    },
    batchExpiry: {
      type: Date,
      required: true,
    },
    requiresPrescription: {
      type: Boolean,
    },
    supplierEmail: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Medicine = mongoose.model('Medicine', medicineSchema);
