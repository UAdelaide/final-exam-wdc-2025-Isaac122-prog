const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;


//logout endpoit
app.post('/api/auth/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: 'cannot log out'});
        }
        res.clearCookie('connect.sid', {
            path:'/',
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production'
        });
        res.clearCookie('connect.sid', { path: '/'});
        res.status(200).json({message:'logged otu successful'});
    })
})