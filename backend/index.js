const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const mysql = require("mysql2"); // Import mysql2 for MySQL database

// Setting up port number
const PORT = process.env.PORT || 4000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for file uploads
app.use(fileUpload());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Change this to your MySQL host
  user: 'root',      // Change this to your MySQL username
  password: '',      // Change this to your MySQL password
  database: 'bucketData', // Change this to your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testing the server
app.get("/", (req, res) => {
  pool.query("SELECT 1", (error, results) => {
    if (error) {
      console.error("Failed to connect to MySQL:", error);
      return res.json({
        success: false,
        message: "Failed to connect to MySQL database."
      });
    }
    return res.json({
      success: true,
      message: "Your server is up and running ..."
    });
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
