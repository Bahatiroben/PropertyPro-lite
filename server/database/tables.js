import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });


class tables {
      users = `CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY UNIQUE,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phoneNumber TEXT NOT NULL UNIQUE,
      isAdmin boolean DEFAULT false,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

     properties = `CREATE TABLE IF NOT EXISTS properties (
      id serial PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      type TEXT NOT NULL,
      price DECIMAL NOT NULL,
      address TEXT,
      state TEXT,
      imageUrl TEXT,
      description TEXT,
      ownerEmail TEXT NOT NULL,
      ownerPhoneNumber TEXT NOT NULL,
      ownerId INTEGER REFERENCES users (id) ON DELETE CASCADE,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

   flags = `CREATE TABLE IF NOT EXISTS flags (
        id SERIAL PRIMARY KEY UNIQUE,
        propertyId INTEGER NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        address TEXT,
        description VARCHAR(50),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
     createTables = async () => {
    await pool.query(users);
    await pool.query(properties);
    await pool.query(flags);
    }
};
export default new tables();
