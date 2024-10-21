const express = require('express');
const { addCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', auth, addCustomer);           // Add customer
router.get('/', auth, getCustomers);           // Get all customers
router.put('/:id', auth, updateCustomer);      // Update customer
router.delete('/:id', auth, deleteCustomer);   // Delete customer
router.delete('/:id', [auth, roleCheck(['admin'])], deleteCustomer); // Only admins can delete customers

module.exports = router;