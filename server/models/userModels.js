/* eslint-disable no-lone-blocks */

import uuid from 'uuid';
import moment from 'moment';
import data from '../data/data';

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
		try {
			const newUser = { ...details };
			if (!newUser.password || !newUser.email) {
				return { status: 'error', code: 400, data: { message: 'email or password missing' } };
			}
			// check the existence
			const already = data.users.find(user => user.email === newUser.email);
			if (already) {
				return { status: 'error', code: 403, data: { message: 'User already exist' } };
			}
			newUser.id = uuid.v4();
			data.users.push(newUser);
			return { status: 'Success', code: 201, data: data.users[data.users.indexOf(newUser)] };
		} catch (err) {
			return { status: 'error', code: 500, data: { message: 'internal Error' } };
		}
	}

	login({ email, password }) {
		// check if the user exist
		const me = data.users.find(user => user.email === email);
		if (me) {
			// check if the password matches
			if (me.password === password && me.email === email) {
				return { status: 'success', code: 200, data: me };
			}
			return { status: 'error', code: 401, data: { message: ' email or password is incorrect' } };
		}
		return { status: 'error', code: 404, data: { message: 'User not found' } };
	}
}

module.exports = new UserModel();
