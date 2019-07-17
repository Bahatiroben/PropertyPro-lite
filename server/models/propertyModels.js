/* eslint-disable quotes */
import Database from '../database/database';

class PropertyModel {
	async create(req) {
		const { userId } = req.body;
		const { title, type, price, address, state, imageUrl, description } = { ...details };

		const createAd = `INSERT INTO users
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;
		try {
			const { rows } = await Database.execute(createAd,
				[title, type, price, address, state, imageUrl, description, userId]);
			const makeAdmin = `UPDATE users SET
            isAdmin = $1
            WHERE id = $2`;
			await Database.execute(makeAdmin, [true, userId]);
			return { status: 201, data: rows[0] };
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}

	async findOne(id) {
		// eslint-disable-next-line eqeqeq
		const getProperty = `SELECT * FROM properties WHERE id = 1$`;
		const { rows } = Database.execute(getProperty, [id]);
		// breakpoint
		if (!rows) {
			return { status: 404, data: { error: 'Property Not found' } };
		}
		return { status: 200, data: rows[0] };
	}

	findAll() {
		try {
			const getProperty = `SELECT * FROM properties`;
			const { rows } = Database.execute(getProperty);
			return { status: 200, data: rows };
		} catch (error) {
			return { status: 200, data: { error } };
		}
	}


	async search(input) {
		try {
			const { type } = input;
			const getType = `SELECT * FROM properties WHERE type = $1`;
			const { rows } = await Database.execute(getType, [input]);
			if (!rows) {
				return { status: 404, data: { error: 'Property Not found' } };
			}
			return { status: 200, data: rows };
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}
}
