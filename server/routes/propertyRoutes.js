import express from 'express';
import fileupload from 'express-fileupload';
import property from '../controllers/propertyControllers';
import flag from '../controllers/flagControllers';
import helper from '../middlewares/helpers';

// properties toutes
const router = express.Router();
router.use(
	fileupload({
		useTempFiles: true
	})
);

router.get('/', helper.verifyToken, property.search);
router.post('/', helper.verifyToken, property.create);
router.get('/:id', helper.verifyToken, property.findOne);
router.post('/flag/:id', helper.verifyToken, flag.flag);
router.patch('/:id', helper.verifyToken, property.update);
router.delete('/:id', helper.verifyToken, property.delete);
router.patch('/:id/sold', helper.verifyToken, property.sold);
export default router;
