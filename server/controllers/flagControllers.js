import express from 'express';
import bodyParser from 'body-parser';
import FlagModel from '../models/flagModels';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const flagController = {

	flag(req, res) {
		const { status, code, data } = FlagModel.flag(req.params.id, req.body);
		res.status(code).json({ status, data });
	}
};

export default flagController;
