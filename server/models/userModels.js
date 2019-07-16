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
			if (!rows[0]) {
				return { status: 403, data: { error: 'User already exist' } };
			}
		} catch (error) {
            return { status: 500, data: { error } };
        
            const hashedPassword = helper.hashThePassword(password);
            const newUser = [ ,firstName, lastName, email, phoneNumber, hashedPassword, phoneNumber, , ];
        
        const createUser = `INSERT INTO users
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;
    try {
      const { rows } = await Database.execute(createUser, newUser);
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
}

module.exports = new UserModel();