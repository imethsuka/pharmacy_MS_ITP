import express from "express";

import  User  from '../models/user.model.js';

const router = express.Router();

// Route to add a new Medicine
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password ||
      !request.body.gender ||
      !request.body.dob ||
      !request.body.address 
     

    ) {
      return response.status(400).send({

        message: 'Send all required fields: name, email, password, gender, dob, address'

      });
    }
    const newUser = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      gender: request.body.gender,
      dob: request.body.dob,
      address: request.body.address,
      
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all Users
router.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
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

    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a User
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.name ||
        !request.body.email ||
        !request.body.password ||
        !request.body.gender ||
        !request.body.dob ||
        !request.body.address 
       
    ) {
      return response.status(400).send({

        message: 'Send all required fields: name, email, password, gender, dob, address'

      });
    }

    
    const { id } = request.params;

    const result = await Medicine.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a Medicine
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




export default router;