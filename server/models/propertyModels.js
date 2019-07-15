/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */

/* eslint-disable space-infix-ops */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import joi from 'joi';
import moment from 'moment';
import data from '../data/data';
import schema from '../helpers/validation';


class PropertyModel {
	create(req) {
		const details = req.body;
		const {
			title, imageUrl, price, address
		} = details;
		const { error } = joi.validate({
			title, imageUrl, price, address
		}, schema.property);

		if (error) {
			if (error.details[0].type === 'any.required') {
				return { status: 400, data: { error: 'All fields are required' } };
			}
			return { status: 400, data: { error: error.details[0].message } };
		}

		const { id } = req.payload;


		const newProperty = { ...details };

		if (data.properties.length === 0) {
			newProperty.id = 1;
		} else {
			newProperty.id = data.properties[data.properties.length -1].id + 1;
		}

		newProperty.status = 'available';
		newProperty.createdOn = moment.now();
		newProperty.flags = [];
		newProperty.ownerId = id;
		data.properties.push(newProperty);
		// set the user as the admin
		data.users.find(user => user.id===id).isAdmin = true;
		return { status: 201, data: data.properties[data.properties.indexOf(newProperty)] };
	}

	findOne(id) {
		// eslint-disable-next-line eqeqeq
		const property = data.properties.find(prop => prop.id == id);
		if (property === undefined) {
			return { status: 404, data: { error: 'Property Not found' } };
		}
		return { status: 200, data: property };
	}

	findAll() {
		return { status: 200, data: data.properties };
	}


	search(input) {
		const keys = Object.keys(input);
		if (data.properties.length === 0) {
			return { status: 204, data: { error: 'No properties in stock' } };
		}
		// eslint-disable-next-line array-callback-return
		const result = data.properties.filter((property) => {
			for (let prop in property) {
				for (let index = 0; index < keys.length; index++) {
					let check = keys[index];
					// eslint-disable-next-line no-undef
					if (check === prop) {
						// eslint-disable-next-line eqeqeq
						if (input[check] == property[check]) {
							return property;
						}
					}
				}
			}
		});

		if (result.length !== 0) {
			return { status: 200, data: result };
		}
		return { status: 404, data: { error: 'Property not found' } };
	}

	delete(req) {
		// const { email } = req.payload;
		const ownerId = req.payload.id;
		const { id } = req.params;

		const owner = data.users.find(user => user.id == ownerId);
		if (!owner.isAdmin) {
			return { status: 401, data: { error: 'not Authorized' } };
		}
		// find if the property exist
		const prop = this.findOne(id);
		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		if (prop.data.ownerId != ownerId) {
			return { status: 403, data: { error: 'Forbiden' } };
		}

		const property = prop.data;
		if (property) {
			const index = data.properties.indexOf(property);
			data.properties.splice(index, 1);
			return { status: 200, data: { error: 'property deleted successfully' } };
		}
	}

	update(req) {
		const ownerId = req.payload.id;
		// eslint-disable-next-line eqeqeq
		const owner = data.users.find(user => user.id == ownerId);
		if (!owner.isAdmin) {
			return { status: 401, data: { error: 'Not Authorized' } };
		}
		// find if the property exist

		const { id } = req.params;
		const details = req.body;
		let prop = this.findOne(id);
		let index;

		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		if (prop.data.ownerId != owner.id) {
			return { status: 404, data: 'Property not found' };
		}

		const property = prop.data;
		if (property) {
			index = data.properties.indexOf(property);
			for (let prop in details) {
				for (let sameprop in property) {
					if (prop === sameprop) {
						property[prop] = details[sameprop];
					}
				}
			}
			const {
				title, imageUrl, price, address
			} = property;
			const { error } = joi.validate({
				title, imageUrl, price, address
			}, schema.property);

			if (error) {
				if (error.details[0].type === 'any.required') {
					return { status: 400, data: { error: 'All fields are required' } };
				}
				return { status: 400, data: { error: error.details[0].message } };
			}

			data.properties.splice(index, 1, property);
			return { status: 201, data: data.properties[index] };
		}
		return { status: 404, data: ' Property not found' };
	}

	sold(req) {
		const ownerId = req.payload.id;
		const { id } = req.params;
		const prop = this.findOne(id);

		if (prop.status !== 200) {
			return { status: prop.status, data: prop.data };
		}

		if (prop.data.ownerId != ownerId) {
			return { status: 401, data: { error: 'Not Authorized' } };
		}

		const property = prop.data;

		if (property) {
			const index = data.properties.indexOf(property);
			if (property.status === 'sold') {
				property.status = 'available';
			} else {
				property.status = 'sold';
			}

			data.properties.splice(index, 1, property);
			return { status: 201, data: data.properties[index] };
		}
		return { status: 404, data: { error: 'Property not found' } };
	}
}

module.exports = new PropertyModel();
