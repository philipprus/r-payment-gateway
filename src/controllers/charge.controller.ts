import { Request, Response } from 'express';
import { IChargeRequest } from '../models/charge.model';
import paymentService from '../service/payment.service';

const chargeController = {
    post: async (req: Request, res: Response) => {
        const identifier = req.headers["merchant-identifier"];
        const chargeRequest: IChargeRequest = {
            identifier,
            ...req.body
        }

        const response = await paymentService(chargeRequest);
        if (response.error) {
            res.status(response.status).send(response.error);
        } else {
            res.status(response.status).send(response.data);
        }
    },
};


export default chargeController;
