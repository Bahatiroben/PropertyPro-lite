import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';
// import { createTables } from './database/tables';

dotenv.config();

const pool = new Pool({ connectionString: 'postgres://postgres:bahati@localhost/proplite' });


const createTables = async () => {
	console.log('pool');
	const users = `CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY UNIQUE,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phoneNumber TEXT NOT NULL UNIQUE,
      isAdmin boolean DEFAULT false,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

	const properties = `CREATE TABLE IF NOT EXISTS properties (
      id serial PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      type TEXT NOT NULL,
      price DECIMAL NOT NULL,
      address TEXT,
      state TEXT,
      imageUrl TEXT,
      description TEXT,
      ownerId INTEGER REFERENCES users (id) ON DELETE CASCADE,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

	const flags = `CREATE TABLE IF NOT EXISTS flags (
        id SERIAL PRIMARY KEY UNIQUE,
        propertyId INTEGER NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        reason TEXT),
        description TEXT,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await pool.query(users);
	console.log('users created');
	await pool.query(properties);
	console.log('properties created');
	await pool.query(flags);
	console.log('flags created');
};


createTables();

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
// middle wares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
	res.status(200).json('you are welcome to propertypro-lite');
});
app.listen(PORT, () => {
	console.log('listening on port 3000 ...');
});
module.exports = app;
