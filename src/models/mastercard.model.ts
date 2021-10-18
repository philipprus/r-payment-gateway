import { ERROR_MSG } from "../util/constant";
import { CreditCardResponse } from "../types";
import { IChargeRequest } from "./charge.model"

interface MastercardBodyInterface {
    first_name: string,
    last_name: string,
    card_number: string,
    expiration: string,
    cvv: string,
    charge_amount: number,
}

interface MastercardResponse {
    status: number,
    data?: string,
    decline_reason?: string | "Insufficient funds",
}

const mastercardCreditCard = {

    url: 'https://interview.riskxint.com/mastercard/capture_card',

    createRequest: (chargeRequest: IChargeRequest): MastercardBodyInterface => {
        let name: string[] = chargeRequest.fullName.split(" ");
        return {
            first_name: name[0],
            last_name: name[1],
            card_number: chargeRequest.creditCardNumber,
            expiration: chargeRequest.expirationDate.split("/").join("-"),
            cvv: chargeRequest.cvv,
            charge_amount: chargeRequest.amount
        }
    },
    parseResponse(response: any): CreditCardResponse {
        if (response.data && response.status == 200) {
            return {
                status: 200,
            }
        } else {
            return {
                status: 200,
                error: ERROR_MSG
            }
        }
    }

}

export default mastercardCreditCard;