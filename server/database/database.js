import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
	constructor() {
		this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
		this.connect = async () => this.pool.connect();
		this.initialize();
	}

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
}

export default new Database();
