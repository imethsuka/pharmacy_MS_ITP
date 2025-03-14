import express from 'express';
import { Medicine } from '../models/inventoryModel.js';

const router = express.Router();

// Route to add a new Medicine
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.productId ||
      !request.body.catergory ||
      !request.body.description ||
      !request.body.howToUse ||
      !request.body.sideEffects ||
      !request.body.price ||
      !request.body.stock ||
      !request.body.reorderLevel ||
      !request.body.batchExpiry ||
      !request.body.requiresPrescription ||
      !request.body.supplierEmail ||
      !request.body.imageUrl

    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, productId, catergory, description, howToUse, sideEffects, price, stock, reorderLevel, batchExpiry, requiresPrescription, supplierEmail, imageUrl',
      });
    }
    const newMedicine = {
      name: request.body.name,
      productId: request.body.productId,
      catergory: request.body.catergory,
      description: request.body.description,
      howToUse: request.body.howToUse,
      sideEffects: request.body.sideEffects,
      price: request.body.price,
      stock: request.body.stock,
      reorderLevel: request.body.reorderLevel,
      batchExpiry: request.body.batchExpiry,
      requiresPrescription: request.body.requiresPrescription,
      supplierEmail: request.body.supplierEmail,
      imageUrl: request.body.imageUrl,
    };

    const medicine = await Medicine.create(newMedicine);

    return response.status(201).send(medicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all Medicines
router.get('/', async (request, response) => {
  try {
    const medicines = await Medicine.find({});

    return response.status(200).json({
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get a single Medicine by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const medicine = await Medicine.findById(id);

    return response.status(200).json(medicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a Medicine
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.productId ||
      !request.body.catergory ||
      !request.body.description ||
      !request.body.howToUse ||
      !request.body.sideEffects ||
      !request.body.price ||
      !request.body.stock ||
      !request.body.reorderLevel ||
      !request.body.batchExpiry ||
      !request.body.requiresPrescription ||
      !request.body.supplierEmail ||
      !request.body.imageUrl

    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, productId, catergory, description, howToUse, sideEffects, price, stock, reorderLevel, batchExpiry, requiresPrescription, supplierEmail, imageUrl',
      });
    }

    const { id } = request.params;

    const result = await Medicine.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Medicine not found' });
    }

    return response.status(200).send({ message: 'Medicine updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a Medicine
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Medicine.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Medicine not found' });
    }

    return response.status(200).send({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

