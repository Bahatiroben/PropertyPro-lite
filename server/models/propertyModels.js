/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable quotes */
import Database from '../database/database';

class PropertyModel {
	async create(req) {
		const { userId } = req.body;
		const {
			title, type, price, address, state, imageUrl, description
		} = { ...req };

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

	async findAll() {
		try {
			const getProperty = `SELECT * FROM properties`;
			const { rows } = await Database.execute(getProperty);
			return { status: 200, data: rows[0] };
		} catch (error) {
			return { status: 500, data: { error } };
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

	async delete(req) {
		// const { email } = req.payload;
		const ownerId = req.body.userId;
		const { id } = req.params;

		const getOwner = `SELECT * FROM users WHERE id = 1$`;
		const { rows } = await Database.execute(getOwner, [ownerId]);
		if (rows[0].isAdmin === false) {
			return { status: 401, data: { error: 'not Authorized' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		// eslint-disable-next-line eqeqeq
		if (prop.data.ownerId != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		try {
			const query = `DELETE FROM properties WHERE id = 1$`;
			Database.execute(query, [id]);
			return { status: 200, data: { error: 'property deleted successfully' } };
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}

	async update(req) {
		// const { email } = req.payload;
		const ownerId = req.body.userId;
		const { id } = req.params;

		const getOwner = `SELECT * FROM users WHERE id = 1$`;
		const { rows } = await Database.execute(getOwner, [ownerId]);
		if (rows[0].isAdmin === false) {
			return { status: 401, data: { error: 'not Authorized' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		// eslint-disable-next-line eqeqeq
		if (prop.data.ownerId != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		const property = prop.data;
		if (property) {
			index = data.properties.indexOf(property);
			for (let prop in details) {
				for (let sameprop in property) {
					if (prop === sameprop) {
						property[prop] = details[sameprop];
					}
				}
			}
			const values = Object.values(property);
			const keys = Object.keys(property);

			// formation of the query
			let query = `UPDATE properties SET ${keys[0]} = ${values[0]}`;
			for (let index = 1; index < values.length; index++) {
				query += `${keys[0]} = ${values[0]}`;
			}
			await Database.execute(query);
			return { status: 200, data: { suceess: 'Success' } };
		}
	}

	async sold(req) {
		// const { email } = req.payload;
		const ownerId = req.body.userId;
		const { id } = req.params;

		const getOwner = `SELECT * FROM users WHERE id = 1$`;
		const { rows } = await Database.execute(getOwner, [ownerId]);
		if (rows[0].isAdmin === false) {
			return { status: 401, data: { error: 'not Authorized' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		// eslint-disable-next-line eqeqeq
		if (prop.data.ownerId != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		try {
			const getProperty = `SELECT * FROM properties WHERE id = 1$`;
			const { rows } = await Database.execute(getProperty, ['sold']);
			if (rows[0].status === 'available') {
				const markSold = `UPDATE properties SET status = 1$`;
				await Database.execute(markSold, [id]);
			}
			if (rows[0].status === 'sold') {
				const markSold = `UPDATE properties SET status = 1$`;
				await Database.execute(markSold, ['available']);
			}
			return { status: 200, data: { message: 'property deleted successfully' } };
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}
}

export default new PropertyModel();
