import joi from 'joi';
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
			await Database.execute(makeAdmin, [true, userId])
			return { status: 201, data: rows };
		} catch (error) {
			return { status: 500, data: { error } };
		}
	}
}
