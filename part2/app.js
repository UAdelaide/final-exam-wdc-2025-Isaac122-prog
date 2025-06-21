const express = require('express');
const path = require('path');
require('dotenv').config();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Users'
  };


const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//Login
app.post('/login', async (req, res) => {
    const {username, password } = req.body;
    try {
        const con = await mysql.createConnection(dbConfig);
        const [rows] = await con.execute(
            'SELECT * FROM Users WHERE username = ? AND password_hash = ?', [username, password]
        );
        await con.end();

        if(rows.length === 0) {
            return res.json({success: false, message: 'Invalid/Incorrect credentials'});
        }

        const user = rows[0];
        req.session.user = {
            id: user.user_id,
            username: user.username,
            role: user.role
        };

        if (user.role === 'owner') {
            return res.json({success:true, redirect: 'owner-dashboard.html'});
        } else if (user.role === 'walker') {
            return res.json({success:true, redirect: 'walker-dashboard.html'});
        }else {
            return res.json({success:false, message: 'no role'});
        }
    } catch (err) {
        console.errror(err);
        res.status(500).json({success:false, message: 'Server error'});
    }
});







// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
