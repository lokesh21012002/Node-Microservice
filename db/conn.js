const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'travel-plan.cyygs5fosaa4.eu-north-1.rds.amazonaws.com',
    user: 'root',
    password:'password',
    
    database: 'travel_plan',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});




module.exports = pool.promise();