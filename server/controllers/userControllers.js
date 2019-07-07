import UserModel from '../models/userModels';

const userController = {
	signup(req, res) {
		const newUser = UserModel.signup(req.body);
		res.status(200).json(newUser);
	},

	login(req, res) {
		const currentUser = UserModel.login(req.body);
		res.status(200).json(currentUser);
	}
};

export default userController;
