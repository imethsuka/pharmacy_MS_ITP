import express from 'express';
import { Test } from '../models/testModel.js';  // Assuming Test model is in the testModel.js
import { Medicine } from '../models/medicineModel.js';  // Assuming Medicine model is in the medicineModel.js

const router = express.Router();

// Route to create a new order (Test)
router.post('/create', async (request, response) => {
  try {
    const { name, userId, email, phone, medicines, notes } = request.body;
    
    if (!medicines || medicines.length === 0) {
      return response.status(400).json({ message: 'At least one medicine is required' });
    }

    // Check if any medicine requires a prescription
    const medicineDetails = await Medicine.find({ _id: { $in: medicines } });
    const requiresPrescription = medicineDetails.some(medicine => medicine.requiresPrescription);

    // Create a new order (Test)
    const newOrder = new Test({
      name,
      userId: userId || 'guest',
      email,
      phone,
      medicines, // Array of medicine IDs
      requiresPrescription, // Set based on medicines
      notes: notes || '',
    });

    // Save the order to the database
    const order = await newOrder.save();

    return response.status(201).json({
      success: true,
      order,
      message: 'Order created successfully'
    });
    
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
});

// Route to get an order by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const order = await Test.findById(id).populate('medicines');
    
    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }
    
    return response.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to get all orders
router.get('/', async (request, response) => {
  try {
    const orders = await Test.find({}).populate('medicines');
    
    return response.status(200).json({
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to update the order status (for the pharmacist to verify the order)
router.put('/:id/status', async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body; // status can be 'pending', 'approved', or 'rejected'

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return response.status(400).json({ message: 'Invalid status' });
    }

    // Find the order and update the status
    const updatedOrder = await Test.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return response.status(404).json({ message: 'Order not found' });
    }

    return response.status(200).json({
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${status}`,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to delete an order by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    
    const order = await Test.findByIdAndDelete(id);

    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }

    return response.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
});

export default router;