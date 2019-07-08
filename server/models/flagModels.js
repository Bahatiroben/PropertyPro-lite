import uuid from 'uuid';
import moment from 'moment';
import data from '../data/data';

class FlagModel {
	flag(id, details) {
		const newFlag = { ...details };
		newFlag.created_on = moment.now();
		newFlag.property_id = uuid.v4();
		newFlag.id = uuid.v4();
		return data.flags.push(newFlag);
	}
}

module.exports = new FlagModel();
