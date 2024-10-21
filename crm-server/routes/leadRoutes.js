// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

// Get all leads
router.get('/', protect, leadController.getLeads);

// Get a single lead by ID
router.get('/:id', protect, leadController.getLeadById);

// Create a new lead
router.post('/', protect, leadController.createLead);

// Update an existing lead
router.put('/:id', protect, leadController.updateLead);

// Delete a lead
router.delete('/:id', protect, leadController.deleteLead);

module.exports = router;