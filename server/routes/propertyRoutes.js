import express from 'express';
import property from '../controllers/propertyControllers';
import flag from '../controllers/flagControllers';
import helper from '../middlewares/helpers';

// properties toutes
const router = express.Router();

router.get('/', property.search);
router.post('/', helper.verifyToken, property.create);
router.get('/:id', property.findOne);
router.post('/flag/:id', flag.flag);
router.patch('/:id', helper.verifyToken, property.update);
router.delete('/:id', helper.verifyToken, property.delete);
router.patch('/:id/sold', helper.verifyToken, property.sold);
export default router;
