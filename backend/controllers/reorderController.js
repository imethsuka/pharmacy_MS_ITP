import { Medicine } from '../models/inventoryModel.js';
import { Reorder } from '../models/reorderModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Check if email credentials are loaded
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_APP_PASSWORD;

console.log('Email credentials check:', {
  emailUser: emailUser ? 'Loaded' : 'Not loaded',
  emailPassword: emailPassword ? 'Loaded' : 'Not loaded'
});

// Configure nodemailer for Gmail with App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: emailUser || 'dehemibasnayake201@gmail.com', // Fallback to hard-coded email if env variable not loaded
    pass: emailPassword || 'ndqspaojrhoekcej'  // Fallback to hard-coded password if env variable not loaded
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter connection on server start
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP server connection error:', error);
    console.log('To fix Gmail authentication issues:');
    console.log('1. Enable 2-Step Verification on your Google Account');
    console.log('2. Generate an App Password at https://myaccount.google.com/apppasswords');
    console.log('3. Use that App Password in your .env file as EMAIL_APP_PASSWORD');
  } else {
    console.log('SMTP server connection established successfully');
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
    if (!reorder.supplierEmail || !validateEmail(reorder.supplierEmail)) {
      console.error('Invalid supplier email:', reorder.supplierEmail);
      return false;
    }

    const mailOptions = {
      from: `"Sethsiri Pharmacy" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
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
    
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending reorder email:', error);
    return false;
  }
};

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
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
    
    // We no longer automatically update medicine stock when status is completed
    // This allows manual control over when to update stock
    
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

// Send an order to supplier via email
export const sendOrderToSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      status, 
      note, 
      supplierEmail, 
      dosage, 
      brand, 
      quantity,
      pharmacyDetails
    } = req.body;
    
    // Validate email
    if (!supplierEmail || !validateEmail(supplierEmail)) {
      return res.status(400).json({ message: 'Invalid supplier email address' });
    }
    
    // Find the reorder
    const reorder = await Reorder.findById(id);
    if (!reorder) {
      return res.status(404).json({ message: 'Reorder request not found' });
    }
    
    // Find associated medicine for additional details
    const medicine = await Medicine.findById(reorder.medicineId);
    
    // Update reorder with new information
    const updatedReorder = await Reorder.findByIdAndUpdate(
      id,
      {
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {}),
        supplierEmail,
        note,
        dosage,
        brand,
        quantityRequested: quantity || reorder.quantityRequested
      },
      { new: true }
    );
    
    // Prepare email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #3d37f2;">Medicine Order Request</h2>
          <p style="color: #64748b; font-size: 14px;">Order Date: ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #334155; margin-top: 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Medicine Details</h3>
          <p><strong>Medicine Name:</strong> ${reorder.medicineName}</p>
          <p><strong>Product ID:</strong> ${reorder.productId}</p>
          ${dosage ? `<p><strong>Dosage:</strong> ${dosage}</p>` : ''}
          ${brand ? `<p><strong>Brand:</strong> ${brand}</p>` : ''}
          <p><strong>Quantity:</strong> ${quantity || reorder.quantityRequested} units</p>
          ${note ? `<p><strong>Special Instructions:</strong> ${note}</p>` : ''}
        </div>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">
          <h3 style="color: #334155; margin-top: 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Pharmacy Information</h3>
          <p><strong>Name:</strong> ${pharmacyDetails?.name || 'Sethsiri Pharmacy'}</p>
          <p><strong>Address:</strong> ${pharmacyDetails?.address || '123 Health Street, Colombo 07'}</p>
          <p><strong>Contact:</strong> ${pharmacyDetails?.contactNumber || '+94 11 234 5678'}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
          <p>This is an automated email sent from Sethsiri Pharmacy Management System.</p>
          <p>Please reply to this email to confirm receipt of this order request.</p>
        </div>
      </div>
    `;
    
    // Send email to supplier
    let emailSent = false;
    try {
      const mailOptions = {
        from: `"Sethsiri Pharmacy" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
        to: supplierEmail,
        subject: `Order Request for ${reorder.medicineName}`,
        html: emailContent
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Order email sent successfully:', info.response);
      
      // Update reorder record to mark email as sent
      await Reorder.findByIdAndUpdate(id, {
        emailSent: true,
        emailSentAt: new Date()
      });
      
      emailSent = true;
    } catch (emailError) {
      console.error('Error sending order email:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      // We'll continue even if email fails
    }
    
    // We no longer automatically update the medicine stock when status is completed
    // This allows manual control over when to update stock
    
    res.status(200).json({
      message: emailSent ? 'Order processed and email sent successfully' : 'Order processed but email sending failed',
      emailSent,
      reorder: updatedReorder
    });
  } catch (error) {
    console.error('Error sending order to supplier:', error);
    res.status(500).json({ message: 'Error sending order to supplier' });
  }
};