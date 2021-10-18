import { CreditCardCompanyNameType } from "./creditCard.model";

export interface IChargeRequest  {
    identifier: string;
    fullName: string,
    creditCardNumber: string,
    creditCardCompany: CreditCardCompanyNameType,
    expirationDate: string,
    cvv: string,
    amount: number,
}