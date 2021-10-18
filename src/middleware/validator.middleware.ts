import { creditCardPropertyRules, CreditCardCompanyNameType } from "../models/creditCard.model";
import { IChargeRequest } from "../models/charge.model";
import { NextFunction, Request, Response } from "express";
import logger from "../util/logger";

const validateRequestType = (chargeRequest: IChargeRequest): boolean => {
    for (const property of creditCardPropertyRules) {
        if (chargeRequest.hasOwnProperty(property.name)) {
            const chargeValue: string | number | CreditCardCompanyNameType = chargeRequest[property.name];
            if (typeof chargeValue !== property.type) {
                return false
            }
            if (property.validator && !property.validator(chargeValue)) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}


const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Checking Fields');

    const chargeRequest: IChargeRequest = {
        ...req.body
    }
    if (!validateRequestType(chargeRequest)) {
        res.status(400).send();
    } else {
        next();
    }
}

export default validatorMiddleware;