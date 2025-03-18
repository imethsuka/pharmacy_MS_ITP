import express from 'express';
import { Driver } from '../models/driverModel.js';

const router = express.Router();

// Route to add a new driver
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.DName ||
      !request.body.VehicleType ||
      !request.body.Phone ||
      !request.body.Email ||
      !request.body.LicenseNumber ||
      !request.body.Availability
    ) {
      return response.status(400).send({
        message: 'Send all required fields: DName, VehicleType, Phone, Email, LicenseNumber, Availability',
      });
    }
    const newDriver = {
      DName: request.body.DName,
      VehicleType: request.body.VehicleType,
      Phone: request.body.Phone,
      Email: request.body.Email,
      LicenseNumber: request.body.LicenseNumber,
      Availability: request.body.Availability,
      
    };

    const driver = await Driver.create(newDriver);

    return response.status(201).send(newDriver);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all drivers
router.get('/', async (request, response) => {
  try {
    const drivers = await Driver.find({});

    return response.status(200).json({
      count: drivers.length,
      data: drivers,
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

    const driver = await Driver.findById(id);

    return response.status(200).json(driver);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a Medicine
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.DName ||
      !request.body.VehicleType ||
      !request.body.Phone ||
      !request.body.Email ||
      !request.body.LicenseNumber ||
      !request.body.Availability 
    

    ) {
      return response.status(400).send({
        message: 'Send all required fields: DName, VehicleType, Phone, Email, LicenseNumber, Availability',
    });
    
    }

    const { id } = request.params;

    const result = await Driver.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Driver not found' });
    }

    return response.status(200).send({ message: 'Driver updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a Medicine
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Driver.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Driver not found' });
    }

    return response.status(200).send({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

