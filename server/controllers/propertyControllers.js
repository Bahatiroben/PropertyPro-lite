import express from 'express';
import bodyParser from 'body-parser';
import joi from 'joi';
import PropertyModel from '../models/propertyModels';
import schema from '../middlewares/validations';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
	}
}