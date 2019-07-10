import express from 'express';
import property from '../controllers/propertyControllers';
import flag from '../controllers/flagControllers';

// properties toutes
const router = express.Router();

router.get('/', property.search);
router.post('/', property.create);
router.get('/:id', property.findOne);
router.patch('/:id/flag', flag.flag);
router.patch('/:id', property.update);
router.delete('/:id', property.delete);
router.patch('/:id/sold', property.sold);
module.exports = router;
