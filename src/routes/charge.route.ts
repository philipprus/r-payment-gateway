import { Router } from 'express';
import headerMiddleware from '../middleware/header.middleware';
import chargeController from '../controllers/charge.controller';
import validatorMiddleware from '../middleware/validator.middleware';

const router = Router();
router.post('/', headerMiddleware, validatorMiddleware, chargeController.post);

export default router;
