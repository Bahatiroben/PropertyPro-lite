import express from 'express';
import flag from '../controllers/flagControllers';

const router = express.Router();
router.patch('/:id', flag.flag);

export default router;
