import joi from 'joi';
import UserModel from '../models/userModels';
import schema from '../middlewares/validations';


const userController = {
	signup(req, res) {
		// joi validations
		// eslint-disable-next-line prefer-const
		const {
			email, firstName, lastName, phoneNumber, password
		} = req.body;
		const { error } = joi.validate({
			email, firstName, lastName, phoneNumber, password
		}, schema.user);
		if (error) {
			if (error.details[0].type === 'any.required') {
				return { status: 400, data: { error: 'All fields are required' } };
			} if (error.details[0].type === 'string.regex.base') {
				// eslint-disable-next-line prefer-template
				const err = error.details[0].message.split('with')[0] + ' is not valid';
				return { status: 400, data: err };
			}
			return { status: 400, data: { error: error.details[0].message } };
		}
		const { status, data } = UserModel.signup(req.body);
		res.status(status).json({ status, data });
	}
};

export default userController;
