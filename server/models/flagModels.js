import uuid from 'uuid';
import moment from 'moment';
import data from '../data/data';
import PropertyModel from './propertyModels';

class FlagModel {
	flag(id, details) {
		const newFlag = { ...details };
		newFlag.created_on = moment.now();
		newFlag.id = uuid.v4();
		const result = PropertyModel.findOne(id);
		if (result.code === 404) {
			return { status: 'error', code: 404, data: ' Property not found' };
		}
		const index = data.properties.indexOf(result.data);
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
