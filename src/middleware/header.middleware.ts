import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Check Merchant Identified');
    const hasMerchant = req.headers["merchant-identifier"];

    if (!hasMerchant) {
        res.status(400).send();
    } else {

        next();
    }
}

export default headerMiddleware;