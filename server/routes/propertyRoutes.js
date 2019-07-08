import express from 'express';
import property from '../controllers/propertyControllers';

// properties toutes
const router = express.Router();

router.get('/:id', property.findOne);
router.patch('/:id', property.update);
router.delete('/:id', property.delete);
router.get('/', property.findAll);
router.post('/', property.create);
router.patch('/:id/sold', property.sold);
router.get('/?type=propertyType', property.search);
module.exports = router;
