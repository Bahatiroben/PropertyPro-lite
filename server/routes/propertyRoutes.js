import express from 'express';
import property from '../controllers/propertyControllers';
import flag from '../controllers/flagControllers';
import helper from '../helpers/helper';

// properties toutes
const router = express.Router();

router.get('/', property.search);
router.post('/', helper.verifyToken, property.create);
router.get('/:id', property.findOne);
router.patch('/flag', flag.flag);
router.patch('/:id', helper.verifyToken, property.update);
router.delete('/:id', helper.verifyToken, property.delete);
router.patch('/:id/sold', helper.verifyToken, property.sold);
module.exports = router;
