const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  database: 'studio_wedding', 
  port:3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL:' + connection.threadId);
});

module.exports = connection;