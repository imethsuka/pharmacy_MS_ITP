import express from 'express';
import { driver } from '../models/driverModel.js';

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
    const newdriver = {
      DName: request.body.DName,
      VehicleType: request.body.VehicleType,
      Phone: request.body.Phone,
      Email: request.body.Email,
      LicenseNumber: request.body.LicenseNumber,
      Availability: request.body.Availability,
      
    };

    const driver = await driver.create(newdriver);

    return response.status(201).send(driver);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all drivers
router.get('/', async (request, response) => {
  try {
    const driver = await driver.find({});

    return response.status(200).json({
      count: driver.length,
      data: driver,
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

    const driver = await driver.findById(id);

    return response.status(200).json(medicine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a Medicine
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.Dname ||
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

    const result = await driver.findByIdAndUpdate(id, request.body);

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

    const result = await driver.findByIdAndDelete(id);

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

