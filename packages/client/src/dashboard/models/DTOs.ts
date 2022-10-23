import { Currency, Status } from './Models';

export interface SMEDataResponse{
    id: string;
    legalName: string;
    businessType: string;
}
export class SMEUsersResponse{
    constructor(
        public id= '',
        public name = '',
        public email = '',
        public profileImage = '',
    ) {
    }
}
export interface TransactionItemResponse {
    id: string;
    smeId: string;
    amount: string;
    status: Status;
    userId: string;
    transactionTime: string;
    merchantIconUrl: string;
    merchantName: string;
    currency: Currency;
    rejectionReason?: string;
}
