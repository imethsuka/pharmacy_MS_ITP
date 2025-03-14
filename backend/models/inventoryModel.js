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
      unique: true
    },
    catergory: {
      type: String,
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
      //required: false,
    },
    supplierEmail: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
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
