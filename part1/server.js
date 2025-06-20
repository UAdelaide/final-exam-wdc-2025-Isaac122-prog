const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbConfig = {
    host:'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
};

const pool = mysql.createPool(dbConfig);

async function initialiseTestData() {
    const connection = await pool.getConnection();
    try {
        await connection.query('START TRANSACTION')length

        await connection.query(`
        INSER INTO Users (username, email, password_has, role) VALUES
        ('alice123', 'alice@example.com', 'hashed123', ' owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol', 'carol@example.com', 'hashed789', 'owner')
        `);

        await connection.query(`
        INSERT INTO Dogs (owner_id, name, size) VALUES
        ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
        ((SELECT user_id FROM Users WHERE username = 'carol123;), 'Bella','small'),
        ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Charlie', 'large')
        `);

        await connection.query(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
        ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00.00', 30, 'Parklands', 'open'),
        ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted')
        `);

        await connection.query('COMMIT');
        console.log('Test data initialised successfully');
    } catch (err){
        await connection.query('ROLLBACK');
        console.error('Test data initialisation fialed:', err);
    } finally {
        connection.release();
    }
}

app.get('/api/dogs', async (req, res) => {
    try {
        const [results] = await pool.query(`
        SELECT
        d.name AS dog_name,
        d.size,
        u.username AS owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
        `);
        res.json(results);
    } catch (err) {
        console.error('GET /api/dogs error:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/api/walkrequests/open', async (req, res) => {
    try {
        const[results] = await pool.query(`
        SELCT
        wr.request_id,
        d.name AS dog_name,
        wr.requested_time,
        wr.duration_minutes,
        wr.location,
        u.username AS owner_username
        FROM WalkRequests wr
        JOIN Dogs d ON wr.dog_id = d.dog_id
        JOIN Users u ON d.owner_id = u.user_id
        WHERE wr.status = 'open
        `);

        const formatted  = results.map(r => ({
            ...r,
            requested_time: new Date(r.requested_time).toISOString()
        }));

        res.json(formatted);
    } catch (err) {
        console.errror('GET /api/walkrequests/open error:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/api/walkers/summary', async (req, res) => {
    try {
        const[results] = await pool.query(`
        SELECT
        u.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
        AVG(r.rating) AS average_rating,
        COUNT(Distinct a.application_id) AS completed_walks
        FROM Users u
        LEFT JOIN WalkApplications a ON u.user_id = a.walker_id AND a.status = 'accepted'
        LEFT JOIN WalkRatings r ON a.request_id
        WHERE u.role = 'walker
        GROUP BY u.user_id
        `);

        const formatted = results.map(w => ({
            walker_username: w.walker_username,
            total_ratings: Number(w.total_ratings),
            average_rating: w.average_rating ? parseFloat(w.average_rating) : null,
            completed_walks: Number(w.completed_walks)
        }));

        res.json(formatted);
    } catch (err) {
        console.error('GET /api/walkers/summary error:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initialiseTestData();
});