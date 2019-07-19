import joi from 'joi';
import PropertyModel from '../models/propertyModels';
import schema from '../middlewares/validations';

const propertyController = {
	async create(req, res) {
		const details = req.body;
		const {
			title, imageUrl, price, address
		} = details;
		const { error } = joi.validate({
			title, imageUrl, price, address
		}, schema.property);
		if (error) {
			if (error.details[0].type === 'any.required') {
				return res.status(400).json({error: error.details[0].message });
			}
			return res.status(400).json({error: error.details[0].message });
		}
		const { status, data } = await PropertyModel.create(req);
		res.status(status).json({ status, data });
	},

	async findOne(req, res) {
		const { status, data } = await PropertyModel.findOne(req.params.id);
		res.status(status).json({ status, data });
	},

	async search(req, res) {
		const { query } = req;

		if (Object.keys(query).length > 0) {
			const { status, data } = await PropertyModel.search(query);
			res.status(status).json({ status, data });
		} else {
			const { status, data } = await PropertyModel.findAll();
			res.status(status).json({ status, data });
		}
	},

	async delete(req, res) {
		const { status, data } = await PropertyModel.delete(req);
		res.status(status).json({ status, data });
	},

	async update(req, res) {
		const { status, data } = await PropertyModel.update(req);
		res.status(status).json({ status, data });
	},

	async sold(req, res) {
		const { status, data } = await PropertyModel.sold(req);
		res.status(status).json({ status, data });
	}
};
export default propertyController;
