/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-lone-blocks */
import joi from 'joi';
import data from '../data/data';
import helper from '../helpers/helper';
import schema from '../helpers/validation';
// {
// “id” : Integer,
// “email” : String,
// “first_name” : String,
// “last_name” : String,
// “password” : String,
// “phoneNumber” : String,
// “address” : String,
// “is_admin” : Boolean,
// ...
// }

class UserModel {
	signup(details) {
		// joi validations
		// eslint-disable-next-line prefer-const
		let {
			email, firstName, lastName, phoneNumber, password
		} = details;
		const { error } = joi.validate({
			email, firstName, lastName, phoneNumber, password
		}, schema.user);
		if (error) {
			if (error.details[0].type === 'any.required') {
				return { status: 'error', code: 400, data: { message: 'All fields are required' } };
			} if (error.details[0].type === 'string.regex.base') {
				return { status: 'error', code: 400, data: { message: 'The password must contain an uppercase, lowercase, number, special character and at least 8 characters long' } };
			}
			return { status: 'error', code: 400, data: error.details[0].message };
		}
		//

		const hashedPassword = helper.hashThePassword(password);
		const newUser = {
			email, firstName, lastName, phoneNumber, hashedPassword
		};

		// check the existence
		const already = data.users.find(user => user.email === email);
		if (already) {
			return { status: 'error', code: 403, data: { message: 'User already exist' } };
		}
		if (data.users.length === 0) {
			newUser.id = 1;
		} else {
			newUser.id = data.users[data.users.length - 1].id + 1;
		}

		const output = { firstName, lastName, email };
		output.id = newUser.id;
		data.users.push(newUser);
		return { status: 'Success', code: 201, data: output };
	}

	login(userDetails) {
		const {
			email, password
		} = userDetails;

		if (!email || !password) {
			return { status: 'error', code: 401, data: { message: 'all  are required' } };
		}
		// check if the user exist
		const me = data.users.find(user => user.email === email);
		if (!me) {
			return { status: 'error', code: 404, data: { message: 'User Not found' } };
		}
		const {
			lastName, firstName, id, hashedPassword
		} = me;

		// check if the password matches
		if (!helper.checkThepassword(hashedPassword, password)) {
			return { status: 'error', code: 401, data: { message: 'The password is incorrect!!!' } };
		}
		const payload = {
			id, firstName, lastName, email
		};
		const token = helper.getToken(payload);

		if (me.email === email) {
			// data.users.find(user => user.email === email).isLoggedIn = true;
			return { status: 'success', code: 200, data: { token, ...payload } };
		}
	}
}

module.exports = new UserModel();
