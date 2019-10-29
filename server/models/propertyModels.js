/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable quotes */
import Database from '../database/database';

class PropertyModel {
	async create(req) {
		const userId = req.payload.id;
		const {
			title, type, price, address, state, imageUrl, description
		} = req.body;
		const prop = `SELECT * FROM properties WHERE title = $1`;
		const property = await Database.execute(prop, [title]);
		if (property[0]) {
			return { status: 409, data: { error: 'property already exist' } };
		}
		const createAd = `INSERT INTO properties (title, type, price, address, state, imageUrl, description, ownerId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
		try {
			const rows = await Database.execute(createAd,
				[title, type, price, address, state, imageUrl, description, userId]);
			const makeAdmin = `UPDATE users SET
            isAdmin = $1
            WHERE id = $2`;
			await Database.execute(makeAdmin, [true, userId]);
			return { status: 201, data: rows[0] };
		} catch (error) {
			return { status: 500, data: { error: 'something went wrong' } };
		}
	}

	async findOne(id) {
		// eslint-disable-next-line eqeqeq
		const getProperty = `SELECT * FROM properties WHERE id = $1`;
		const rows = await Database.execute(getProperty, [id]);
		// breakpoint
		if (!rows[0]) {
			return { status: 404, data: { error: 'Property Not found' } };
		}
		return { status: 200, data: rows[0] };
	}

	async findAll() {
		try {
			const getProperty = `SELECT * FROM properties`;
			const rows = await Database.execute(getProperty);
			return { status: 200, data: rows };
		} catch (error) {
			return { status: 500, data: { error: 'something went wrong' } };
		}
	}


	async search(input) {
		try {
			const { type } = input;
			const getType = `SELECT * FROM properties WHERE type = $1`;
			const rows = await Database.execute(getType, [type]);
			if (rows.length === 0) {
				return { status: 404, data: { error: 'Property Not found' } };
			}
			return { status: 200, data: rows };
		} catch (error) {
			return { status: 500, data: { error: 'something went wrong' } };
		}
	}

	async delete(req) {
		// const { email } = req.payload;
		const ownerId = req.payload.id;
		const { id } = req.params;
		
		const getOwner = `SELECT * FROM properties WHERE ownerid = $1`;
		const rows = await Database.execute(getOwner, [ownerId]);
		console.log(rows);
		if(!rows[0]) {
			return { status: 403, data: { error: 'forbidden' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}
		const checker = `SELECT * FROM properties WHERE id = $1`;
		const isIn = await Database.execute(checker, [id]);
		// eslint-disable-next-line eqeqeq
		if (isIn[0].ownerid != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		try {
			const query = `DELETE FROM properties WHERE id = $1`;
			await Database.execute(query, [id]);
			const check = `SELECT * FROM properties WHERE id = $1`;
			const prop = await Database.execute(check, [id]);
			if (prop.length === 0) {
				return { status: 200, data: { error: 'property deleted successfully' } };
			}
			return { status: 500, data: { error: 'something went wrong' } };
			
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}

	async update(req) {
		// const { email } = req.payload;
		const ownerId = req.payload.id;
		const { id } = req.params;
		
		const getOwner = `SELECT * FROM properties WHERE ownerid = $1`;
		const rows = await Database.execute(getOwner, [ownerId]);
		if(!rows[0]) {
			return { status: 403, data: { error: 'forbidden' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}
		const checker = `SELECT * FROM properties WHERE id = $1`;
		const isIn = await Database.execute(checker, [id]);
		// eslint-disable-next-line eqeqeq
		if (isIn[0].ownerid != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}
		const getCurrent = `SELECT * FROM properties WHERE id = $1`; 
		const update = `UPDATE properties SET title = $1, type = $2, price = $3 , address = $4 ,state = $5, imageurl = $6, description = $7 WHERE id = $8 RETURNING *`;

		const current = await Database.execute(getCurrent, [id]);
		const { title, type, price, address, state, imageurl, description } = current[0];
		const t = req.body.title || title;
		const tp = req.body.type || type;
		const p = req.body.price || price;
		const a = req.body.address || address;
		const s = req.body.state || state;
		const i = req.body.imageUrl || imageurl;
		const d = req.body.description || description;

		const updated = await Database.execute(update, [t, tp, p, a, s, i, d, id]);

		return { status: 200, data: updated[0] };
	}

	async sold(req) {

		const ownerId = req.payload.id;
		const { id } = req.params;
		
		const getOwner = `SELECT * FROM properties WHERE ownerid = $1`;
		const rows = await Database.execute(getOwner, [ownerId]);
		if(!rows[0]) {
			return { status: 403, data: { error: 'forbidden' } };
		}
		// find if the property exist
		const prop = await this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}
		const checker = `SELECT * FROM properties WHERE id = $1`;
		const isIn = await Database.execute(checker, [id]);
		// eslint-disable-next-line eqeqeq
		if (isIn[0].ownerid != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		try {
			const getProperty = `SELECT * FROM properties WHERE id = $1`;
			const rows = await Database.execute(getProperty, [id]);
			if (rows[0].status === 'available') {
				const markSold = `UPDATE properties SET status = $1`;
				await Database.execute(markSold, ['sold']);
				return { status: 200, data: { message: 'property marked as sold' } };
			}
			if (rows[0].status === 'sold') {
				const markUnsold = `UPDATE properties SET status = $1`;
				await Database.execute(markUnsold, ['available']);
				return { status: 200, data: { message: 'property marked as available' } };
			}
			
		} catch (error) {
			return { status: 500, data: { error: 'something went wrong' } };
		}
	}
}

export default new PropertyModel();
