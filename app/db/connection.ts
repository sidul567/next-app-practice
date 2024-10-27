// db/connection.ts
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

export const connectToDatabase = () => {
  // Create the MySQL connection pool with the environment variables
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  });

  // Wrap the connection with Drizzle ORM for type-safe queries
  return drizzle(pool);
};
