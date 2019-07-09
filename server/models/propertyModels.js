/* eslint-disable prefer-const */

/* eslint-disable space-infix-ops */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import uuid from 'uuid';
import moment from 'moment';
import data from '../data/data';

// {
// “id” : Integer,
// “owner” : Integer, // user id
// “status” : String, // sold,available - default is available
// “price” : Float,
// “state” : String, // State where property is located
// “city” : String, // City where property is located
// “address” : String,
// “type” : String, // 2 bedroom, 3 bedroom etc
// “created_on” : DateTime,
// “image_url” : String,
// ...
// }
class PropertyModel {
	create(details) {
		const newProperty = { ...details };
		newProperty.id = uuid.v4();
		newProperty.status = 'available';
		newProperty.created_on = moment.now();
		data.properties.push(newProperty);
		return data.properties[data.properties.indexOf(newProperty)];
	}

	findOne(id) {
		const property = data.properties.find(prop => prop.id === id);
		return property;
	}

	findAll() {
		return data.properties;
	}

	search(input) {
		const keys = Object.keys(input);
		const result = data.users.filter((property) => {
			for (let prop in property) {
				for (let index = 0; index < keys.length; index++) {
					let check = keys[index];
					// eslint-disable-next-line no-undef
					if (check === prop) {
						if (input[check] == property[check]) {
							return property;
						}
					}
				}
			}
		});
		return result;
	}

	delete(id) {
		// find if the property exist
		const property = this.findOne(id);
		if (property) {
			const index = data.properties.indexOf(property);
			data.properties.splice(index, 1);
			return { status: 200, message: 'property deleted successfully' };
		}
		return { error: 'not found' };
	}

	update(id, details) {
		// find if the property exist
		const property = this.findOne(id);
		if (property) {
			const index = data.properties.indexOf(property);
			for (const prop in details) {
				for (const sameprop in property) {
					if (prop === sameprop) {
						property[prop] = details[sameprop];
					}
				}
			}

			return data.properties.splice(index, 1, property);
		}
		return { error: 'not found' };
	}

	sold(id) {
		const property = this.findOne(id);
		const index = data.properties.indexOf(property);
		if (property) {
			property.status = 'sold';
			data.properties.splice(index, 1, property);
			return data.properties[index];
		}
	}
}

module.exports = new PropertyModel();
