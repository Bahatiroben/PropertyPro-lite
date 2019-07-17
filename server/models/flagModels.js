/* eslint-disable no-sparse-arrays */
import Database from '../database/database';
import PropertyModel from './propertyModels';


class FlagModel {
	async flag(id, details) {
		const { reason, description, email } = details;
		const result = PropertyModel.findOne(id);
		if (result.status === 404) {
			return { status: 404, data: { error: 'Property not found' } };
		}
		const createFlag = `INSERT INTO users
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
		try {
			const output = Database.execute(createFlag, [, id, email, reason, description, ]);
			return {
				status: 201,
				data: {
					message: 'flagged successfully'
				}
			};
		} catch (error) {
			return { status: 500, data: { message: error } };
		}
	}
}

module.exports = new FlagModel();
