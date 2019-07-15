import UserModel from '../models/userModels';


const userController = {
	signup(req, res) {
		const { status, data } = UserModel.signup(req.body);
		res.status(status).json({ status, data });
	},

	login(req, res) {
		const { status, data } = UserModel.login(req.body);
		res.status(status).json({ status, data });
	}
};

export default userController;
