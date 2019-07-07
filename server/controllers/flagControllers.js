import FlagModel from '../models/flagModels';

const flagController = {
	flag(req, res) {
		const newFlag = FlagModel.flag(req.body.id, req.body);
		res.status(200).json(newFlag);
	}
};

export default flagController;
