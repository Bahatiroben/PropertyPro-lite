import PropertyModel from '../models/propertyModels';

const propertyController = {
	create(req, res) {
		const property = PropertyModel.create(req.body);
		res.status(200).json(property);
	},

	findOne(req, res) {
		const property = PropertyModel.findOne(req.params.id);
		res.status(200).json(property);
	},

	search(req, res) {
		const params = { ...req.query };
		if (params.keys && 1) {
			const result = PropertyModel.search(params);
			res.status(200).json(result);
		} else {
			const property = PropertyModel.findAll();
			res.status(200).json(property);
		}
	},

	delete(req, res) {
		const property = PropertyModel.delete(req.params.id);
		res.status(200).json(property);
	},

	update(req, res) {
		const property = PropertyModel.update(req.params.id, req.body);
		res.status(200).json(property);
	},

	sold(req, res) {
		const property = PropertyModel.sold(req.params.id);
		res.status(200).json(property);
	}
};

export default propertyController;
