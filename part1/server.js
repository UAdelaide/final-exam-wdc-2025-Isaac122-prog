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
    }
}}