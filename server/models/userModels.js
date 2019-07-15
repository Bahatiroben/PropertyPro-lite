/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-lone-blocks */
import joi from 'joi';
import data from '../data/data';
import helper from '../helpers/helper';
import schema from '../helpers/validation';


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
				return { status: 400, data: { error: 'All fields are required' } };
			} if (error.details[0].type === 'string.regex.base') {
				return { status: 400, data: { error: 'The password must contain an uppercase, lowercase, number, special character and at least 8 characters long' } };
			}
			return { status: 400, data: { error: error.details[0].message } };
		}
		//

		const hashedPassword = helper.hashThePassword(password);
		const newUser = {
			email, firstName, lastName, phoneNumber, hashedPassword
		};

		// check the existence
		const already = data.users.find(user => user.email === email);
		if (already) {
			return { status: 403, data: { error: 'User already exist' } };
		}

		if (data.users.length === 0) {
			newUser.id = 1;
		} else {
			newUser.id = data.users[data.users.length - 1].id + 1;
		}


		const output = { firstName, lastName, email };
		output.id = newUser.id;
		const id = output.id;
		newUser.isAdmin = false;
		output.isAdmin = false;
		newUser.createdDate = new Date();
		output.createdDate = newUser.createdDate;
		data.users.push(newUser);
		const payload = {
			id, firstName, lastName, email
		};
		const token = helper.getToken(payload);
		return { status: 201, data: { token, ...output } };
	}

	login(userDetails) {
		const {
			email, password
		} = userDetails;

		if (!email || !password) {
			return { status: 400, data: { error: 'All fields are required' } };
		}
		// check if the user exist
		const me = data.users.find(user => user.email === email);
		if (!me) {
			return { status: 404, data: { error: 'User Not found' } };
		}
		const {
			lastName, firstName, id, hashedPassword
		} = me;

		// check if the password matches
		try {
			if (!helper.checkThepassword(hashedPassword, password)) {
				return { status: 401, data: { error: 'The password is incorrect' } };
			}
		} catch (error) {
			return { status: 500, data: { error: 'internal error' } };
		}
		const payload = {
			id, firstName, lastName, email
		};
		const token = helper.getToken(payload);

		if (me.email === email) {
			// data.users.find(user => user.email === email).isLoggedIn = true;
			return { status: 200, data: { token, ...payload } };
		}
	}
}

module.exports = new UserModel();
