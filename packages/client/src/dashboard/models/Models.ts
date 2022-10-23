import { TransactionItemResponse } from './DTOs';

export interface SmeModel{
    name: string;
    transactions: TransactionFeedItem[]
}
export class TransactionFeedItem {
    constructor(
        rawTransactionItem?: TransactionItemResponse,
        public name = rawTransactionItem?.merchantName || '',
        public status = rawTransactionItem?.status || Status.COMPLETED,
        public currency = rawTransactionItem?.currency || Currency.EUR
        ) {
    }
}
export type TransactionSideInfo = Partial<TransactionFeedItem>; // TODO: Omit

export enum Status{
    REJECTED='REJECTED',
    PENDING='PENDING',
    COMPLETED='COMPLETED',
    REVERSED='REVERSED'
}

export enum Currency{
    USD,
    EUR
}
