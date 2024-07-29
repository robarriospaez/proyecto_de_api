import { Router } from 'express';
import { register, login } from '../controllers/userController.js';
import validate from '../middlewares/validationMiddleware.js';
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').optional(),
});

const router = Router();

router.post('/register', validate(userSchema), register);
router.post('/login', validate(userSchema), login);

export default router;