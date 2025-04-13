const express = require('express');
const app = express();
const profileRoute = require('./routes/profile');
import cron from 'node-cron';
import { checkStockLevels } from './controllers/reorderController.js';

// ...existing code...

app.use('/api/profile', profileRoute);

// ...existing code...

// Schedule stock level check every day at 8 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running scheduled stock level check');
  try {
    await checkStockLevels({ isScheduled: true }, { json: () => {} });
  } catch (error) {
    console.error('Error in scheduled stock check:', error);
  }
});

app.listen(5555, () => {
    console.log('Server is running on port 5555');
});
