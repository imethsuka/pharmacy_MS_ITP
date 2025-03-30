import express from 'express';
import { Feedback } from '../models/feedbackModel.js';

const router = express.Router();

// Route to add a new feedback
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.message 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name,email,message',
      });
    }
    const newFeedback = {
      name: request.body.name,
      email: request.body.email,
      message: request.body.message,
      
      
        };
    
        const feedback = new Feedback(newFeedback);
        await feedback.save();
        response.status(201).send(feedback);
      } catch (error) {
        response.status(500).send({
          message: 'Error creating feedback',
          error: error.message,
        });
      }
    });

    export default router;