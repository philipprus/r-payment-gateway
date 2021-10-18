import { ValidationType } from "../types";
import { IChargeRequest } from "./charge.model";

const creditCardCompanyNames = ['visa', 'mastercard'] as const;
export type CreditCardCompanyNameType = typeof creditCardCompanyNames[number];

const cardExprRegex: string = '^(0[1-9]|1[0-2])\/?([0-9]{2})$';

export const creditCardPropertyRules: ValidationType<IChargeRequest>[] = [
    { name: 'fullName', type: 'string' },
    {
        name: 'creditCardNumber', type: 'string',
        validator: (creditCardNumber: string) => creditCardNumber.length == 16
    },
    {
        name: 'creditCardCompany',
        type: 'string',
        validator: (creditCardCompany: CreditCardCompanyNameType) => creditCardCompanyNames.includes(creditCardCompany)
    },
    {
        name: 'expirationDate', type: 'string',
        validator: (expirationDate: string) => !!expirationDate.match(cardExprRegex)
    },
    {
        name: 'cvv', type: 'string',
        validator: (cvv: string) => cvv.length === 3
    },
    {
        name: 'amount', type: 'number',
        validator: (amount: number) => amount > 0
    },
]

