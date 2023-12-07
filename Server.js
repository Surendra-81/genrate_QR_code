const express = require('express');
const QRCode = require('qrcode');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'user', 
    password: 'your_password', 
    database: 'qrcode',
};

// Create a pool connection to the database
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Before connecting to the database, create it if it doesn't exist
(async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        connection.release();
    } catch (error) {
        console.error('Error creating database:', error);
        process.exit(1);
    }
})();

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process on a database connection error
    }
})();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate', async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'Data is required.' });
    }

    try {
        // Save the data to the database
        await saveDataToDatabase(data);

        // Generate QR code
        const qrCode = await QRCode.toDataURL(data);
        res.json({ qrCode });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error generating QR code or saving data to the database.' });
    }
});

async function saveDataToDatabase(data) {
    const connection = await pool.getConnection();

    try {
        const sql = 'INSERT INTO user_data (data) VALUES (?)';
        await connection.query(sql, [data]);
    } finally {
        connection.release();
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
