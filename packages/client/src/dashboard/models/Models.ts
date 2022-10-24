import { TransactionItemResponse } from './DTOs';

export interface SmeModel{
    name: string;
    transactions: TransactionFeedItem[]
}
export class TransactionFeedItem {
    constructor(
        rawTransactionItem?: TransactionItemResponse,
        public name = rawTransactionItem?.merchantName || '',
        public status = rawTransactionItem?.status,
        public icon = rawTransactionItem?.merchantIconUrl || '',
        public userID = rawTransactionItem?.userId || '',
        public date = rawTransactionItem?.transactionTime || '',
        public currency = rawTransactionItem?.currency
        ) {
    }
}
export type UserModel = {
    image: string;
    userName: string

}
export type TransactionSideInfo = Pick<TransactionFeedItem, 'date'| 'status'> & UserModel;

export enum Status{
    REJECTED='REJECTED',
    PENDING='PENDING',
    COMPLETED='COMPLETED',
    REVERSED='REVERSED'
}

export enum Currency{
    USD='$',
    EUR='€'
}
