/* eslint-disable no-mixed-spaces-and-tabs */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
	constructor() {
		this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
		this.connect = async () => this.pool.connect();
		this.initialize();
	}

	users = `CREATE TABLE IF NOT EXISTS users (
		id serial PRIMARY KEY UNIQUE,
		firstName TEXT NOT NULL,
		lastName TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		phoneNumber TEXT NOT NULL,
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
		ownerId INTEGER REFERENCES users (id) ON DELETE CASCADE,
		createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	  )`;

	  flags = `CREATE TABLE IF NOT EXISTS flags (
		  id SERIAL PRIMARY KEY UNIQUE,
		  propertyId INTEGER NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
		  email TEXT NOT NULL,
		  reason TEXT,
		  description TEXT,
		  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	  )`;

	  initialize = async () => {
	  	await this.execute(this.users);
	  	await this.execute(this.properties);
	  	await this.execute(this.flags);
	  }

	  async execute(sql, data = []) {
	  	const connection = await this.connect();
	  	try {
	  		if (data.length) {
	  			const output = await connection.query(sql, data);
	  			return output.rows;
			  }
			  const output = await connection.query(sql);
			  //console.log(output.rows);
	  		return output.rows;
	  	} catch (error) {
	  		return error;
	  	} finally {
	  		connection.release();
		  }
	  }
}

module.exports = new Database();
