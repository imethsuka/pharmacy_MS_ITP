import { Medicine } from '../models/inventoryModel.js';
import { Reorder } from '../models/reorderModel.js';
import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Check stock levels and create reorder requests
export const checkStockLevels = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    const reorderRequests = [];

    for (const medicine of medicines) {
      if (medicine.stock <= medicine.reorderLevel) {
        // Check if there's already a pending reorder for this medicine
        const existingReorder = await Reorder.findOne({
          medicineId: medicine._id,
          status: 'pending'
        });

        if (!existingReorder) {
          // Create a new reorder request
          const newReorder = new Reorder({
            medicineId: medicine._id,
            medicineName: medicine.name,
            productId: medicine.productId,
            quantityRequested: medicine.reorderLevel * 2 - medicine.stock, // Order enough to get above reorder level
            supplierEmail: medicine.supplierEmail,
          });

          await newReorder.save();
          reorderRequests.push(newReorder);

          // Send email to supplier
          await sendReorderEmail(newReorder, medicine);
        }
      }
    }

    if (reorderRequests.length > 0) {
      res.status(200).json({
        message: `Created ${reorderRequests.length} reorder requests`,
        reorders: reorderRequests
      });
    } else {
      res.status(200).json({ message: 'No reorders needed at this time' });
    }
  } catch (error) {
    console.error('Error checking stock levels:', error);
    res.status(500).json({ message: 'Error checking stock levels' });
  }
};

// Send email to supplier for reordering
const sendReorderEmail = async (reorder, medicine) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: reorder.supplierEmail,
      subject: `Reorder Request for ${medicine.name}`,
      html: `
        <h2>Reorder Request</h2>
        <p>We need to reorder the following medicine:</p>
        <ul>
          <li><strong>Medicine Name:</strong> ${medicine.name}</li>
          <li><strong>Product ID:</strong> ${medicine.productId}</li>
          <li><strong>Quantity Requested:</strong> ${reorder.quantityRequested}</li>
          <li><strong>Current Stock:</strong> ${medicine.stock}</li>
        </ul>
        <p>Please process this order as soon as possible.</p>
        <p>Thank you!</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Update reorder record to mark email as sent
    await Reorder.findByIdAndUpdate(reorder._id, {
      emailSent: true,
      emailSentAt: new Date()
    });
    
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending reorder email:', error);
    return false;
  }
};

// Get all reorder requests
export const getAllReorders = async (req, res) => {
  try {
    const reorders = await Reorder.find({})
      .sort({ createdAt: -1 });
    
    res.status(200).json(reorders);
  } catch (error) {
    console.error('Error fetching reorders:', error);
    res.status(500).json({ message: 'Error fetching reorders' });
  }
};

// Update reorder status
export const updateReorderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedReorder = await Reorder.findByIdAndUpdate(
      id,
      {
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      },
      { new: true }
    );
    
    if (status === 'completed') {
      // Update medicine stock
      const medicine = await Medicine.findById(updatedReorder.medicineId);
      if (medicine) {
        medicine.stock += updatedReorder.quantityRequested;
        await medicine.save();
      }
    }
    
    if (!updatedReorder) {
      return res.status(404).json({ message: 'Reorder request not found' });
    }
    
    res.status(200).json(updatedReorder);
  } catch (error) {
    console.error('Error updating reorder status:', error);
    res.status(500).json({ message: 'Error updating reorder status' });
  }
};

// Clear a reorder notification
export const clearReorderNotification = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reorder = await Reorder.findById(id);
    
    if (!reorder) {
      return res.status(404).json({ message: 'Reorder notification not found' });
    }
    
    // Remove the reorder instead of just marking it as cleared
    // This will completely delete it from the database
    await Reorder.findByIdAndDelete(id);
    
    res.status(200).json({ 
      message: 'Notification cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing notification:', error);
    res.status(500).json({ message: 'Error clearing notification' });
  }
};

// Clear all reorder notifications
export const clearAllReorderNotifications = async (req, res) => {
  try {
    // Delete all reorders instead of just marking them as cleared
    const result = await Reorder.deleteMany({});
    
    res.status(200).json({ 
      message: 'All notifications cleared successfully',
      count: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing all notifications:', error);
    res.status(500).json({ message: 'Error clearing all notifications' });
  }
};