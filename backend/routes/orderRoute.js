import express from 'express';
import { Order } from '../models/orderModel.js';
import { Medicine } from '../models/inventoryModel.js'; // Changed from medicineModel.js to inventoryModel.js
import mongoose from 'mongoose';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Validate request data
    if (!req.body.items || !req.body.totalAmount || !req.body.shippingAddress) {
      return res.status(400).json({
        message: 'Please provide all required fields: items, totalAmount, shippingAddress'
      });
    }

    // Create a new order
    const newOrder = {
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      prescriptionId: req.body.prescriptionId || null,
      customerId: req.body.customerId || null
    };

    // Update inventory (reduce stock)
    for (const item of req.body.items) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: `Invalid product ID: ${item.productId}` });
      }

      const medicine = await Medicine.findById(item.productId);
      
      if (!medicine) {
        return res.status(404).json({ message: `Medicine not found: ${item.productId}` });
      }
      
      if (medicine.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${medicine.name}. Available: ${medicine.stock}, Requested: ${item.quantity}` 
        });
      }
      
      // Reduce stock
      medicine.stock -= item.quantity;
      await medicine.save();
    }

    const order = await Order.create(newOrder);
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    // In a real app, you would filter by the authenticated user's ID
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Cancel an order (also restores inventory)
router.post('/:id/cancel', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status === 'Delivered') {
      return res.status(400).json({ message: 'Cannot cancel a delivered order' });
    }
    
    // Restore inventory
    for (const item of order.items) {
      const medicine = await Medicine.findById(item.productId);
      if (medicine) {
        medicine.stock += item.quantity;
        await medicine.save();
      }
    }
    
    order.status = 'Cancelled';
    await order.save();
    
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
