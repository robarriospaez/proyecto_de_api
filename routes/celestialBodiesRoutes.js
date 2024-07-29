import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import {
  getAllCelestialBodies,
  createCelestialBodies,
  updateCelestialBodies,
  deleteCelestialBodies,
} from '../controllers/celestialBodiesController.js';

const router = Router();

router.get('/', getAllCelestialBodies);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  createCelestialBodies
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateCelestialBodies
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteCelestialBodies
);

export default router;