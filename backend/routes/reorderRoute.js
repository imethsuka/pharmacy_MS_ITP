import express from 'express';
import { checkStockLevels, getAllReorders, updateReorderStatus } from '../controllers/reorderController.js';

const router = express.Router();

// Check stock levels and create reorder requests
router.post('/check-stock', checkStockLevels);

// Get all reorder requests
router.get('/', getAllReorders);

// Update reorder status
router.put('/:id', updateReorderStatus);

export default router;