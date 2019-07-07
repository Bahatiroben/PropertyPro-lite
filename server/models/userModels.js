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
		this.newUser = { ...details };
		// check the existence
		for (let index = 0; index < data.users.length; index++) {
			if (this.newUser.email === data.users[index].email); {
				return { status: 301, message: 'user already exist' };
			}
		}
		this.newUser.id = uuid.v4();
		data.users.push(this.newUser);
		return data.users[data.users.indexOf(this.newUser)];
	}

	login({ email, password }) {
		// check if the user exist;
		this.me = data.users.find(user => user.email === email);
		if (this.me.password === password) {
			return this.me;
		}
		return { err: 'email or password incorrect' };
	}
}

export default new UserModel();
