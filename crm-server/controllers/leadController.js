// controllers/leadController.js
const Lead = require('../models/Lead');

// Get all leads
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single lead by ID
exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new lead
exports.createLead = async (req, res) => {
    const { name, email, phone, company, status, notes } = req.body;
    try {
        const newLead = new Lead({
            name,
            email,
            phone,
            company,
            status,
            notes
        });
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing lead
exports.updateLead = async (req, res) => {
    const { name, email, phone, company, status, notes } = req.body;
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, company, status, notes },
            { new: true }
        );
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};