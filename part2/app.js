

// // Routes
// const walkRoutes = require('./routes/walkRoutes');
// const userRoutes = require('./routes/userRoutes');

// app.use('/api/walks', walkRoutes);
// app.use('/api/users', userRoutes);

// // Export the app instead of listening here
// module.exports = app;


const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Add  BEFORE your routes
app.use(session({
  secret: 'dogwalksecretkey',   // Use env var in real apps
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }     // Set true only with HTTPS
}));

// ✅ Set up your API routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// ✅ Export the app for use with start.js or testing
module.exports = app;
