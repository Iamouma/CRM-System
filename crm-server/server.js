// server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const leadRoutes = require('./routes/leadRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());          // Enable Cross-Origin Resource Sharing

// Log HTTP requests
app.use(morgan('dev')); // Log requests in development mode

// Routes
app.use('/api/leads', leadRoutes);          // Lead management routes
app.use('/api/customers', customerRoutes);  // Customer management routes
app.use('/api/auth', userRoutes);           // Authentication routes

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});