import { CreditCardResponse } from "../types";
import logger from "./logger";

const MAX_RETRIES = 3;

const callFunctionWithRetries = async (callback: () => Promise<CreditCardResponse>, retryNumber: number, amountRetries: number = MAX_RETRIES) => {
    try {
        return await callback();
    } catch (error) {
        if (retryNumber <= amountRetries) {
            logger.info(`Will retry to charge company in ${retryNumber ** 2} seconds`);
            setTimeout(() => callFunctionWithRetries(callback, retryNumber + 1), retryNumber ** 2 * 1000);
        } else {
            return { status: 500 };
        }
    }
}

export default callFunctionWithRetries;