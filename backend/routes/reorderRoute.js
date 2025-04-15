import express from 'express';
import { 
  checkStockLevels, 
  getAllReorders, 
  updateReorderStatus,
  clearReorderNotification,
  clearAllReorderNotifications,
  sendOrderToSupplier
} from '../controllers/reorderController.js';

const router = express.Router();

// Check stock levels and create reorder requests
router.post('/check-stock', checkStockLevels);

// Get all reorder requests
router.get('/', getAllReorders);

// Update reorder status
router.put('/:id', updateReorderStatus);

// Clear a single notification
router.put('/:id/clear', clearReorderNotification);

// Clear all notifications
router.put('/clear-all', clearAllReorderNotifications);

// Send order to supplier via email
router.put('/:id/send-order', sendOrderToSupplier);

export default router;