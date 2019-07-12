import uuid from 'uuid';
import moment from 'moment';
import joi from 'joi';
import data from '../data/data';
import PropertyModel from './propertyModels';
import schema from '../helpers/validation';


class FlagModel {
	flag(id, details) {
		const { reason, description, email } = details;
		const propertyId = id;
		const { error } = joi.validate(
			{
				reason, description, email, id
			},
			schema.property
		);

		if (error) {
			if (error.details[0].type === 'any.required') {
				return { status: 'error', code: 400, data: { message: 'All fields are required' } };
			}
			return { status: 'error', code: 400, data: { message: error.details[0].message } };
		}
		const newFlag = { ...details };
		newFlag.created_on = moment.now();
		const result = PropertyModel.findOne(id);
		if (result.code === 404) {
			return { status: 'error', code: 404, data: ' Property not found' };
		}
		const index = data.properties.indexOf(result.data);

		newFlag.id = uuid.v4;
		data.properties[index].flags.push(newFlag);
		return {
			status: 'success',
			code: 201,
			data: {
				message: 'flagged successfully'
			}
		};
	}
}

module.exports = new FlagModel();
