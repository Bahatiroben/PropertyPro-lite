import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import Database from '../database/database';


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
    // a middleware
	async verifyToken(req, res, next) {
		const bearerHeader = req.headers.authorization;
		if (!bearerHeader) {
			return res.status(400).json({ status: 400, error: 'No token found' });
		}
		const token = bearerHeader.split(' ')[1];
		try {
            const { id, email } = await jwt.verify(token, process.env.SECRETKEY);
            const getUser = `SELECT * FROM users WHERE id = $1`;
            const { rows } = await Database.execute(getUser, [id]);
            if (!rows[0]) {
              return res.status(401).send({ message: 'Invalid Token' });
            }
            req.body.userId = id;
            next();
          } catch (error) {
            return res.status(500).send(error);
          }
		next();
	}
};
export default Helper;
