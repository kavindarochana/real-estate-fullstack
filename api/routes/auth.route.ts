import { googleAuth, login, register } from '../controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-auth', googleAuth);


export default router;