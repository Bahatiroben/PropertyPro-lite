import express from 'express';
import joi from 'joi';
import bodyParser from 'body-parser';
import schema from '../middlewares/validations';
import FlagModel from '../models/flagModels';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const flagController = {
	async flag(req, res) {
		const {
			email, reason, description
		} = req.body;
		// eslint-disable-next-line prefer-destructuring
		const id = req.params.id;
		const { error } = joi.validate({
			email, reason, description, id
		}, schema.flag);
		if (error) {
			if (error.details[0].type === 'any.required') {
				return res.status(400).json({ status: 400, data: { error: 'All fields are required' } });
			} if (error.details[0].type === 'string.regex.base') {
				// eslint-disable-next-line prefer-template
				const err = error.details[0].message.split('with')[0] + ' is not valid';
				return res.status(400).json({ status: 400, data: err });
			}
			return res.status(400).json({ status: 400, data: { error: error.details[0].message } });
		}

		const { status, data } = await FlagModel.flag(req.params.id, req.body);
		return res.status(status).json({ status, data });
	}
};

export default flagController;
