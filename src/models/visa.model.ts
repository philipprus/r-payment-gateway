import { response } from "express";
import { CreditCardResponse } from "../types";
import { IChargeRequest } from "./charge.model";

interface VisaBodyInterface {
    fullName: string,
    number: string,
    expiration: string,
    cvv: string,
    totalAmount: number,
}

type ChargeResult = 'Success' | 'Failure';

interface VisaResponse {
    chargeResult: ChargeResult,
    resultReason: string
}


const visaCreditCard = {

    url: 'https://interview.riskxint.com/visa/api/chargeCard',

    createRequest: (chargeRequest: IChargeRequest): VisaBodyInterface => ({
        fullName: chargeRequest.fullName,
        number: chargeRequest.creditCardNumber,
        expiration: chargeRequest.expirationDate,
        cvv: chargeRequest.cvv,
        totalAmount: chargeRequest.amount
    }),
    parseResponse(responseData: any): CreditCardResponse {
        const data: VisaResponse = responseData.data;
        if (data.chargeResult == 'Success') {
            return {
                status: 200,
                data
            }
        } else {
            return {
                status: 200,
                error: data.resultReason
            }
        }
    }

}

export default visaCreditCard;