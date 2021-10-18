import { Request, Response } from 'express';
import { getRecordFromDatabase } from '../db';

const chargeStatuses = {
    get: (req: Request, res: Response) => {
        const identifier = req.headers["merchant-identifier"] as string;
        const result = getRecordFromDatabase(identifier);
        res.status(200).send(result);

    },
};


export default chargeStatuses;
