import express from 'express';
import { Medicine } from '../models/inventoryModel.js';

const router = express.Router();

// Route to add a new Medicine
router.post('/', async (request, response) => {
  try {
    const { name, categoryId, description, howToUse, sideEffects, price, stock, reorderLevel, batchExpiry, requiresPrescription, supplierEmail, imageUrl } = request.body;
    
    if (!name || !categoryId || !price || stock === undefined || !batchExpiry) {
      return response.status(400).send({
        message: 'Send all required fields: name, categoryId, price, stock, batchExpiry',
      });
    }
    
    const newMedicine = await Medicine.create(request.body);
    return response.status(201).send(newMedicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all Medicines
router.get('/', async (request, response) => {
  try {
    const medicines = await Medicine.find({});
    return response.status(200).json({ count: medicines.length, data: medicines });
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
    if (!medicine) return response.status(404).json({ message: 'Medicine not found' });
    return response.status(200).json(medicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a Medicine
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, request.body, { new: true });
    if (!updatedMedicine) return response.status(404).json({ message: 'Medicine not found' });
    return response.status(200).json(updatedMedicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a Medicine
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    if (!deletedMedicine) return response.status(404).json({ message: 'Medicine not found' });
    return response.status(200).send({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

