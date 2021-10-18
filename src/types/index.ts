import { IChargeRequest } from "../models/charge.model"

export type ValidationType<T> = {
    name: keyof T;
    type: string;
    validator?: (prop: unknown) => boolean;
}

export type CreditCardCompany = {
    url: string;
    createRequest: (chargeRequest: IChargeRequest) => void;
}

export interface CreditCardResponse {
    status: number,
    error?: string
    data?: any;
}