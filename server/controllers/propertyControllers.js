import joi from 'joi';
import PropertyModel from '../models/propertyModels';
import schema from '../middlewares/validations';

const propertyController = {
	create(req, res) {
		const details = req.body;
		const {
			title, imageUrl, price, address
		} = details;
		const { error } = joi.validate({
			title, imageUrl, price, address
		}, schema.property);

		if (error) {
			if (error.details[0].type === 'any.required') {
				return { status: 400, error: error.details[0].message };
			}
			return { status: 400, error: error.details[0].message };
		}
		const { status, data } = PropertyModel.create(req);
		res.status(status).json({ status, data });
	},

	findOne(req, res) {
		const { status, data } = PropertyModel.findOne(req.params.id);
		res.status(status).json({ status, data });
	},

	search(req, res) {
		const { query } = req;

		if (Object.keys(query).length > 0) {
			const { status, data } = PropertyModel.search(query);
			res.status(status).json({ status, data });
		} else {
			const { status, data } = PropertyModel.findAll();
			res.status(status).json({ status, data });
		}
	},
};
