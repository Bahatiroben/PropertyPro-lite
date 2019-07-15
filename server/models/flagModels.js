import uuid from 'uuid';
import moment from 'moment';
import data from '../data/data';
import PropertyModel from './propertyModels';


class FlagModel {
	flag(id, details) {
		const { reason, description, email } = details;
		const propertyId = id;
		const newFlag = { ...details };
		newFlag.created_on = moment.now();
		const result = PropertyModel.findOne(id);
		if (result.status === 404) {
			return { status: 404, data: { error: 'Property not found' } };
		}
		const index = data.properties.indexOf(result.data);

		if (data.properties[index].flags.length === 0) {
			newFlag.id = 1;
		} else {
			newFlag.id = data.properties[index].flags[data.properties[index].flags.length - 1].id + 1;
		}
		data.properties[index].flags.push(newFlag);
		return {
			status: 201,
			data: {
				message: 'flagged successfully'
			}
		};
	}
}

module.exports = new FlagModel();
