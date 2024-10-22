import mysql from 'mysql2/promise';

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection({
            host: "sql12.freemysqlhosting.net", // new host
            user: "sql12739815", // new username
            password: "caYUSUFEW5", // new password
            database: "sql12739815", // database name
            port: 3306 // use the given port
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
