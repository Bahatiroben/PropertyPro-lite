import express from 'express';
import Property from '../controllers/propertyControllers';

// properties toutes
const router = express.Router();

router.post('/property', Property.create);
router.route('/property/:id')
	.patch(Property.update)
	.delete(Property.delete)
	.get(Property.findOne);
router.patch('/:id/sold', Property.sold);
router.get('/?type=propertyType', Property.search);
