// const express = require('express');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '/public')));

// // Routes
// const walkRoutes = require('./routes/walkRoutes');
// const userRoutes = require('./routes/userRoutes');

// app.use('/api/walks', walkRoutes);
// app.use('/api/users', userRoutes);

// // Export the app instead of listening here
// module.exports = app;



const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Configure your MySQL database
const dbConfig = {
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'Users',
};

router.post('/login', async (req, res) => {
    console.log('Login endpoint hit');
    const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM Users WHERE username = ?',
      [username]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.json({ success: false, message: 'User not found' });
    }

    const user = rows[0];

    // For now, comparing plain-text passwords (not secure for production)
    const isPasswordCorrect = password === user.password_hash;

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: 'Incorrect password' });
    }

    // Redirect based on role
    let redirect = '';
    if (user.role === 'owner') {
      redirect = 'owner-dashboard.html';
    } else if (user.role === 'walker') {
      redirect = 'walker-dashboard.html';
    }

    return res.json({ success: true, redirect });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
