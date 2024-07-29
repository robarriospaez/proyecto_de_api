import { Router } from 'express';
import {
  createObservation,
  getAllObservation,
  updateObservation,
  deleteObservation,
} from '../controllers/observationController.js';
import validate from '../middlewares/validationMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Joi from 'joi';

const observationsSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  celestialBodyId: Joi.string().required(),
});

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(observationsSchema),
  createObservation
);

router.get('/', authMiddleware, getAllObservation);

router.put(
  '/:id',
  authMiddleware,
  validate(observationsSchema),
  updateObservation
);

router.delete(
  '/:id',
  authMiddleware,
  deleteObservation
);

export default router;