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
		const createFlag = `INSERT INTO flags (propertyid, email, reason, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
		try {
			const output = await Database.execute(createFlag, [id, email, reason, description]);
			if (!output[0]) {
				return { status: 500, data: {error: 'something gone wrong'}}
			}
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
