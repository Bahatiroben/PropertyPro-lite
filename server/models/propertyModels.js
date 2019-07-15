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
				return { status: 'error', code: 400, data: { message: 'All fields are required' } };
			}
			return { status: 'error', code: 400, data: { message: error.details[0].message } };
		}

		const { id } = req.payload;


		try {
			const newProperty = { ...details };

			newProperty.id = Math.floor(Math.random() * 10000);

			newProperty.status = 'available';
			newProperty.createdOn = moment.now();
			newProperty.flags = [];
			newProperty.ownerId = id;
			data.properties.push(newProperty);
			// set the user as the admin
			data.users.find(user => user.id===id).isAdmin = true;
			return { status: 'success', code: 201, data: data.properties[data.properties.indexOf(newProperty)] };
		} catch (err) {
			return { status: 'error', code: 501, data: 'internal error' };
		}
	}

	findOne(id) {
		// eslint-disable-next-line eqeqeq
		const property = data.properties.find(prop => prop.id == id);
		if (property === undefined) {
			return { status: 'error', code: 404, data: { message: 'Property Not found' } };
		}
		return { status: 200, code: 200, data: property };
	}

	findAll() {
		return { status: 200, code: 200, data: data.properties };
	}


	search(input) {
		const keys = Object.keys(input);
		if (data.properties.length === 0) {
			return { status: 'error', code: 204, data: { message: 'No properties in stock' } };
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
			return { status: 'success', code: 200, data: result };
		}
		return { status: 'error', code: 404, data: { message: 'Property not found' } };
	}

	delete(req) {
		// const { email } = req.payload;
		const ownerId = req.payload.id;
		const { id } = req.params;

		const owner = data.users.find(user => user.id == ownerId);
		if (!owner.isAdmin) {
			return { status: 'error', code: 401, data: { message: 'not Authorized' } };
		}
		// find if the property exist
		const prop = this.findOne(id);
		if (prop.code !== 200) {
			return { status: 'error', code: prop.code, data: prop.data };
		}

		if (prop.data.ownerId != ownerId) {
			return { status: 'error', code: 403, data: 'Forbiden' };
		}

		const property = prop.data;
		if (property) {
			const index = data.properties.indexOf(property);
			data.properties.splice(index, 1);
			return { status: 'success', code: 200, data: { message: 'property deleted successfully' } };
		}
	}

	update(req) {
		const ownerId = req.payload.id;
		// eslint-disable-next-line eqeqeq
		const owner = data.users.find(user => user.id == ownerId);
		if (!owner.isAdmin) {
			return { status: 'error', code: 401, data: { message: 'Not Authorized' } };
		}
		// find if the property exist

		const { id } = req.params;
		const details = req.body;
		let prop = this.findOne(id);
		let index;

		if (prop.code !== 200) {
			return { status: 'error', code: prop.code, data: prop.data };
		}

		if (prop.data.ownerId != owner.id) {
			return { status: 'error', code: 404, data: 'Property not found' };
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
					return { status: 'error', code: 400, data: { message: 'All fields are required' } };
				}
				return { status: 'error', code: 400, data: { message: error.details[0].message } };
			}

			data.properties.splice(index, 1, property);
			return { status: 'success', code: 201, data: data.properties[index] };
		}
		return { status: 'error', code: 404, data: ' Property not found' };
	}

	sold(req) {
		const ownerId = req.payload.id;
		const { id } = req.params;
		const prop = this.findOne(id);

		if (prop.code !== 200) {
			return { status: 'error', code: prop.code, data: prop.data };
		}

		if (prop.data.ownerId != ownerId) {
			return { status: 'error', code: 401, data: ' Not Authorized' };
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
			return { status: 'success', code: 201, data: data.properties[index] };
		}
		return { status: 'error', code: 404, data: { message: ' Property not found' } };
	}
}

module.exports = new PropertyModel();
