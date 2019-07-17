
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-lone-blocks */
import Database from '../database/database';
import helper from '../middlewares/helpers';


class UserModel {
	async signup(details) {
		// joi validations
		// eslint-disable-next-line prefer-const
		let {
			email, firstName, lastName, phoneNumber, password
		} = details;
		let output;
		// check the existence
		const getUser = 'SELECT * FROM users WHERE email = $1';
		try {
			const { rows } = await Database.execute(getUser, [email]);
			if (rows[0]) {
				return { status: 403, data: { error: 'User already exist' } };
			}
		} catch (error) {
			return { status: 500, data: { error } };
		}

		const hashedPassword = helper.hashThePassword(password);
		const newUser = [firstName, lastName, email, hashedPassword, phoneNumber];

		const createUser = `INSERT INTO users
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
		try {
			const { rows } = await Database.execute(createUser, newUser);
			delete rows.password;
			output = rows;
		} catch (error) {
			return { status: 403, data: { error } };
		}

		const id = output.id;
		const payload = {
			id, firstName, lastName, email
		};
		const token = helper.getToken(payload);
		return { status: 201, data: { token, ...output } };
	}

	async login({ email, password }) {
		// check if the user exist
		let output;
		let hashedPassword;
		const getUser = 'SELECT * FROM users WHERE email = $1';
		try {
			const { rows } = await Database.execute(getUser, [email]);
			hashedPassword = rows.password;
			delete rows.password;
			output = rows;
			if (!rows[0]) {
				return { status: 404, data: { error: 'User Not found' } };
			}
		} catch (error) {
			return { status: 500, data: { error } };
		}


		// check if the password matches
		try {
			if (!helper.checkThepassword(hashedPassword, password)) {
				return { status: 401, data: { error: 'The password is incorrect' } };
			}
		} catch (error) {
			return { status: 500, data: { error: 'internal server error' } };
		}
		const { id, firstName, lastName } = output;
		const token = helper.getToken({ id, firstName, lastName, email });
		return { status: 200, data: { token, ...output } };
	}
}
module.exports = new UserModel();
