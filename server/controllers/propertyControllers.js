import express from 'express';
import bodyParser from 'body-parser';
import PropertyModel from '../models/propertyModels';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const propertyController = {
	create(req, res) {
		const { status, code, data } = PropertyModel.create(req.body);
		res.status(code).json({ status, data });
	},

	findOne(req, res) {
		const { status, code, data } = PropertyModel.findOne(req.params.id);
		res.status(code).json({ status, data });
	},

	search(req, res) {
		const { query } = req;
		if (Object.keys(query).length > 0) {
			const { status, code, data } = PropertyModel.search(query);
			res.status(code).json({ status, data });
		} else {
			const { status, code, data } = PropertyModel.findAll();
			res.status(code).json({ status, data });
		}
	},

	delete(req, res) {
		const { status, code, data } = PropertyModel.delete(req.params.id);
		res.status(code).json({ status, data });
	},

	update(req, res) {
		const { status, code, data } = PropertyModel.update(req.params.id, req.body);
		res.status(code).json({ status, data });
	},

	sold(req, res) {	
		const { status, code, data } = PropertyModel.sold(req.params.id);
		res.status(code).json({ status, data });
	}
};

export default propertyController;
