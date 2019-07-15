import express from 'express';
import bodyParser from 'body-parser';
import PropertyModel from '../models/propertyModels';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const propertyController = {
	create(req, res) {
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

	delete(req, res) {
		const { status, data } = PropertyModel.delete(req);
		res.status(status).json({ status, data });
	},

	update(req, res) {
		const { status, data } = PropertyModel.update(req);
		res.status(status).json({ status, data });
	},

	sold(req, res) {
		const { status, data } = PropertyModel.sold(req);
		res.status(status).json({ status, data });
	}
};

export default propertyController;
