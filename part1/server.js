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
    const 
}