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
		for (let index = 0; index < data.users.length; index++) {
			if (newUser.email === data.users[index].email); {
				return { status: 301, message: 'user already exist' };
			}
		}
		newUser.id = uuid.v4();
		data.users.push(newUser);
		return data.users[data.users.indexOf(newUser)];
	}

	login({ email, password }) {
		// check if the user exist;
		const me = data.users.find(user => user.email === email);
		if (me.password === password) {
			return me;
		}
		return { err: 'email or password incorrect' };
	}
}

export default UserModel;
