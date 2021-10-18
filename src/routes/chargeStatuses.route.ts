import { Router } from 'express';
import headerMiddleware from '../middleware/header.middleware';
import chargeStatusesController from '../controllers/chargeStatuses.controller';

const router = Router();
router.get('/', headerMiddleware, chargeStatusesController.get);

export default router;
