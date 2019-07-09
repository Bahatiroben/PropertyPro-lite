import express from 'express';
import user from '../controllers/userControllers';

const router = express.Router();

router.post('/signup', user.signup);
router.post('/signin', user.login);

export default router;
