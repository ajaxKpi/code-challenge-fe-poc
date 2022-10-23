import { sendGetRequest, sendPostRequest } from '../../api/ApiService';
import { SMEDataResponse, SMEUsersResponse, TransactionItemResponse } from '../models/DTOs';
import { AuthApi } from '../../auth/api/AuthApi';
import { Status, TransactionFeedItem } from '../models/Models';

export function getSME(): Promise<SMEDataResponse> {
    return sendGetRequest<SMEDataResponse>('sme-data')
}
export function getCurrentUser(): Promise<SMEUsersResponse>{
    const currentUserEmail = AuthApi.getCurrentUserEmail();
    return sendGetRequest<SMEUsersResponse[]>('users')
        .then((users=>users.filter(user=>user.email === currentUserEmail)))
        .then(users => users[0])
}
export function getSmeTransactions(
    userId: string,
    smeId: string,
    status = Status.COMPLETED,
    offset?:number,
    limit?: number
): Promise<TransactionFeedItem[]>{
    const params = {
        userId,
        smeId,
        status,
    ...(offset && {offset}),
    ...(limit && {limit}),
    };
    const body = {
        smeId
    }
    return sendPostRequest<any,  {data: TransactionItemResponse[]}>('transactions',body,  params)
        .then(rawTransactions=>rawTransactions.data)
        .then(rawTransactions => rawTransactions.map(transaction=>new TransactionFeedItem(transaction)));
}
