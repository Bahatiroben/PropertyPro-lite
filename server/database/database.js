import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

class Database {
  constructor() {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.connect = async () => this.pool.connect();
    this.initialize();
     this.users = `CREATE TABLE IF NOT EXISTS userTable (
      id serial PRIMARY KEY UNIQUE,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      isAdmin boolean DEFAULT false,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    this.properties = `CREATE TABLE IF NOT EXISTS propertyTable (
      id serial PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      type TEXT NOT NULL,
      price DECIMAL NOT NULL,
      address TEXT,
      state TEXT,
      imageUrl TEXT,
      description TEXT,
      ownerEmail TEXT REFERENCES userTable (email) ON DELETE CASCADE,
      ownerPhoneNumber TEXT REFERENCES userTable (phoneNumber) ON DELETE CASCADE,
      ownerId INTEGER REFERENCES userTable (id) ON DELETE CASCADE,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    this.flags = `CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY UNIQUE,
        propertyId INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
        email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        address TEXT,
        description VARCHAR(50),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  };



    // CONNECTING TO THE DATABASE
    async execute(sql, data = []) {
      const connection = await this.connect();
      try {
        if (data.length) return await connection.query(sql, data);
        return await connection.query(sql);
      } catch (error) {
        return error;
      } finally {
        connection.release();
      }
    }


    async initialize() {
      await this.execute(this.users);
      await this.execute(this.properties);
      await this.execute(this.flags);
    }
}

export default Database;
