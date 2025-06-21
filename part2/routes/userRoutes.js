// const express = require('express');
// const router = express.Router();
// const db = require('../models/db');

// // GET all users (for admin/testing)
// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// // POST a new user (simple signup)
// router.post('/register', async (req, res) => {
//   const { username, email, password, role } = req.body;

//   try {
//     const [result] = await db.query(`
//       INSERT INTO Users (username, email, password_hash, role)
//       VALUES (?, ?, ?, ?)
//     `, [username, email, password, role]);

//     res.status(201).json({ message: 'User registered', user_id: result.insertId });
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// router.get('/me', (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ error: 'Not logged in' });
//   }
//   res.json(req.session.user);
// });

// // POST login (dummy version)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [rows] = await db.query(`
//       SELECT user_id, username, role FROM Users
//       WHERE email = ? AND password_hash = ?
//     `, [email, password]);

//     if (rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.json({ message: 'Login successful', user: rows[0] });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup with hashed password)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, hashedPassword, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// GET currently logged in user
router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// ✅ POST login (secure + uses session)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, password_hash, role
      FROM Users
      WHERE username = ?
    `, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Store login in session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// ✅ POST logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
