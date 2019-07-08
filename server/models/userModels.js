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
		const newUser = { ...details };
		// check the existence
		const already = data.users.find(user => user.email === newUser.email);
		if (already) {
			return { status: 301, message: 'User already exist' };
		}
		newUser.id = uuid.v4();
		data.users.push(newUser);
		return data.users[data.users.indexOf(newUser)];
	}

	login({ email, password }) {
		// check if the user exist;
		const me = data.users.find(user => user.email === email);
		if (me) {
			if (me.password === password) {
				return me;
			}
			return { err: 'password incorrect' };
		}
		return { err: 'User not found' };
	}
}

module.exports = new UserModel();
