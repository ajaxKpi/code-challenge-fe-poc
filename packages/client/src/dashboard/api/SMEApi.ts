import { sendGetRequest, sendPostRequest } from '../../api/ApiService';
import { SMEDataResponse, SMEUsersResponse, TransactionItemResponse } from '../models/DTOs';
import { Status, TransactionFeedItem } from '../models/Models';
import { UserDataStorage } from '../../UsersDataStorage';

export function getSME(): Promise<SMEDataResponse> {
    return sendGetRequest<SMEDataResponse>('sme-data')
}
export function getCurrentUser(): Promise<SMEUsersResponse>{
    const currentUserEmail = UserDataStorage.getCurrentUserEmail();
    return sendGetRequest<SMEUsersResponse[]>('users')
        .then(users=> UserDataStorage.setSmeUsers(users)) // Side effect but to much redo
        .then((users=>users.filter(user=>user.email === currentUserEmail)))
        .then(users => users[0])
}
export function getSmeTransactions(
    smeId: string,
    status = Status.COMPLETED,
    offset?:number,
    limit: number = 10
): Promise<TransactionFeedItem[]>{
    const params = {
        smeId,
        status,
    ...(offset && {offset}),
    ...(limit && {limit}),
    };
    const body = {
        smeId
    }
    return sendPostRequest<
        { smeId: string },
        {data: TransactionItemResponse[] }>('transactions', body, params)
        .then(rawTransactions => rawTransactions.data)
        .then(rawTransactions => rawTransactions.map(transaction => new TransactionFeedItem(transaction)));
}
