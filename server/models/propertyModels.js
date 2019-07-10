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
		try {
			const newProperty = { ...details };
			newProperty.id = uuid.v4();
			newProperty.status = 'available';
			newProperty.created_on = moment.now();
			newProperty.flags = [];
			data.properties.push(newProperty);
			return { status: 'success', code: 201, data: data.properties[data.properties.indexOf(newProperty)] };
		} catch (err) {
			return { status: 'error', code: 501, data: err };
		}
	}

	findOne(id) {
		const property = data.properties.find(prop => prop.id === id);
		if (property) {
			return { status: 200, code: 200, data: property };
		}
		return { status: 'error', code: 404, data: { message: 'Property Not found' } };
	}

	findAll() {
		try {
			return { status: 200, code: 200, data: data.properties };
		} catch (err) {
			return { status: 'error', code: 500, data: { message: 'internal error' } };
		}
	}

	search(input) {
		try {
			const keys = Object.keys(input);
			const result = data.properties.filter((property) => {
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

			if (result.length > 0) {
				return { status: 'success', code: 200, data: result };
			}
			return { status: 'error', code: 404, data: { message: 'Property Not found' } };
		} catch (err) {
			return { status: 'error', message: err };
		}
	}

	delete(id) {
		// find if the property exist
		const prop = this.findOne(id);
		if (prop.code === 404) {
			return { status: 'error', code: 404, data: ' Property not found' };
		}

		const property = prop.data;
		if (property) {
			const index = data.properties.indexOf(property);
			data.properties.splice(index, 1);
			return { status: 'success', code: 200, data: { message: 'property deleted successfully' } };
		}
		return { status: 'success', code: 404, data: { message: 'property not found' } };
	}

	update(id, details) {
		// find if the property exist

		let property = this.findOne(id);
		if (property.code === 404) {
			return { status: 'error', code: 404, data: ' Property not found' };
		}

		property = property.data;
		if (property) {
			const index = data.properties.indexOf(property);
			for (const prop in details) {
				for (const sameprop in property) {
					if (prop === sameprop) {
						property[prop] = details[sameprop];
					}
				}
			}

			return {
				status: 'success',
				code: 200,
				data: data.properties.splice(index, 1, property)
			};
		}
		return { status: 'error', code: 404, data: ' Property not found' };
	}

	sold(id) {
		const prop = this.findOne(id);
		if (prop.code === 404) {
			return { status: 'error', code: 404, data: ' Property not found' };
		}

		const property = prop.data;

		if (property) {
			const index = data.properties.indexOf(property);
			property.status = 'sold';
			data.properties.splice(index, 1, property);
			return { status: 'success', code: 200, data: data.properties[index] };
		}
		return { status: 'error', code: 404, data: { message: ' Property not found' } };
	}
}

module.exports = new PropertyModel();
