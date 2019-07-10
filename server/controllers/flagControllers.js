
import FlagModel from '../models/flagModels';
import property from '../models/propertyModels';

const flagController = {

	flag(req, res) {
		const { status, code, data } = FlagModel.flag(req.body.id, req.body);
		res.status(code).json({ status, data });
	}
};

export default flagController;
