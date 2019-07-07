import express from 'express';
import property from '../controllers/propertyControllers';

// properties toutes
const router = express.Router();

router.post('/property', property.create);
router.route('/property/:id')
	.patch(property.update)
	.delete(property.delete)
	.get(property.findOne);
router.patch('/:id/sold', property.sold);
router.get('/?type=propertyType', property.search);
export default router;
