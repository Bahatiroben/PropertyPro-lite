import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import data from '../data/data';


env.config();


const Helper = {

	hashThePassword(password) {
		const salt = bcrypt.genSaltSync(12);
		return bcrypt.hashSync(password, salt);
	},

	checkThepassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword);
	},
	// get token on login
	getToken({
		id, email, firstName, lastName
	}) {
		const token = jwt.sign({
			id, email, firstName, lastName
		}, process.env.SECRET_KEY);
		return token;
	},

	verifyToken(req, res, next) {
		const bearerHeader = req.headers.authorization;
		if (!bearerHeader) {
			return res.status(403).json({ status: 'error', message: 'Not authorized!' });
		}
		let output = 'nothing';
		const token = bearerHeader.split(' ')[1];
		try {
			output = jwt.verify(token, process.env.SECRET_KEY);
		} catch (error) {
			res.status(400).json({ status: 'error', message: 'Invalid Token' });
		}
		const { id, email } = output;
		const user = data.users.find(user => user.id === id);
		if (!user) {
			return res.status(400).json({ status: 'error', message: 'Invalid Token' });
		}
		req.token = token;
		req.payload = { id, email };
		next();
	}
};
export default Helper;
