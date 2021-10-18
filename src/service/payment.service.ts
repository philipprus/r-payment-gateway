import axios from 'axios';
import { IChargeRequest } from '../models/charge.model';
import creditCardFactory from './creditCardFactory.service';
import logger from '../util/logger';
import callFunctionWithRetries from '../util/helper';
import { updateDatabase } from '../db';


const makePayment = async (
    chargeRequest: IChargeRequest,
    url: string,
    buildRequestBody: (chargeRequest: IChargeRequest) => void,
    identifier: string) => {
    const result = await axios.post(
        url,
        buildRequestBody(chargeRequest),
        {
            headers: {
                identifier,
                'Content-Type': 'application/json'
            }
        }
    );
    return result;
}


const paymentService = async (chargeRequest: IChargeRequest) => {
    logger.info(`Start charging request for ${chargeRequest.creditCardCompany}`);

    const currentCompany = creditCardFactory(chargeRequest.creditCardCompany);
    const firstName = chargeRequest.fullName.split(" ")[0];

    try {
        const result = await callFunctionWithRetries(() => makePayment(chargeRequest, currentCompany.url, currentCompany.createRequest, firstName), 1);
        const response = currentCompany.parseResponse(result);

        if (response.status === 200 && response.error) {
            updateDatabase(chargeRequest.identifier, response.error);
        }

        return response;
    } catch (error) {
        logger.error(`An internal error ocurred ${error}`);
        return { status: 500 };
    }
}

export default paymentService;