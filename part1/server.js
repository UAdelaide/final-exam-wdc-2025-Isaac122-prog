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
        (()))`)
    }
}