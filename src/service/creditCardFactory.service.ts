import mastercardCreditCard from "../models/mastercard.model";
import visaCreditCard from "../models/visa.model";
import { CreditCardCompanyNameType } from "../models/creditCard.model";

const creditCardFactory = (companyName: CreditCardCompanyNameType) => {
    switch (companyName) {
        case "mastercard":
            return mastercardCreditCard;
        case "visa":
            return visaCreditCard;
        default:
            throw new Error("Invalid credit card company");
    }
}

export default creditCardFactory;