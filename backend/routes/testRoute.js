// Route to create a new order
export const createOrder = async (req, res) => {
    try {
      const { name, email, phone, medicines, notes, fileUrl } = req.body;
  
      if (!medicines || medicines.length === 0) {
        return res.status(400).json({ message: 'At least one medicine is required' });
      }
  
      // Fetch medicine details
      const selectedMedicines = await Medicine.find({ _id: { $in: medicines } });
      const requiresPrescription = selectedMedicines.some(med => med.requiresPrescription);
  
      const newOrder = new Test({
        name,
        email,
        phone,
        medicines,
        notes: notes || '',
        fileUrl: fileUrl || '',
        status: requiresPrescription ? 'pending' : 'checkout',
      });
  
      const order = await newOrder.save();
      return res.status(201).json({ success: true, order, message: 'Order created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Route to fetch pending orders for pharmacist
  export const getPendingOrders = async (req, res) => {
    try {
      const pendingOrders = await Test.find({ status: 'pending' }).populate('medicines');
      res.status(200).json(pendingOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Route to approve/reject an order
  export const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const updatedOrder = await Test.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  