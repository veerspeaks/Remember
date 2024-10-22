import mysql from 'mysql2/promise'
import { configDotenv } from 'dotenv'

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "GfYa7084@",
            database: "flashcard_db"
        });
        
        if(connection){
            console.log("Connection established")
        }

        const [results] = await connection.execute(sql, params);
        connection.end(); // Close the connection after executing the query
        return results;
        
    } catch (e) {
        console.log("couldn't establish connection", e);
    }
}


export default query;

