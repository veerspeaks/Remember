import mysql from 'mysql2/promise';
require('dotenv').config(); // Load .env variables

async function query(sql, params) {

    console.log(process.env.SHORT)

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.SHORT 
        });
        
        if (connection) {
            console.log("Connection established");
        }

        const [results] = await connection.execute(sql, params);
        connection.end(); // Close the connection after executing the query
        return results;

    } catch (e) {
        console.log("Couldn't establish connection", e);
    }
}

export default query;
