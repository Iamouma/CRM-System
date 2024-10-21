const Customer = require('../models/Customer');

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      createdBy: req.user.id,
    });
    await customer.save();

    // Send welcome email
    await sendEmail({
        to: customer.email,
        subject: 'Welcome to Our CRM',
        text: `Hi ${customer.name}, welcome! We're excited to have you onboard.`,
    });
    
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};   

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};