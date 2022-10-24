import { sendPostRequest } from '../../api/ApiService';
import { LoginRequest, LoginResponse } from '../models/DTOs';
import { UserDataStorage } from '../../UsersDataStorage';


export const AuthApi = (() => {
    let loginToken = '';
    function clearLoginToken(){
            loginToken = '';
    }
    async function login(email: string, password: string): Promise<void>{
        UserDataStorage.setCurrentUserEmail(email);
        return sendPostRequest<LoginRequest, LoginResponse>('/login', {email, password})
            .then(response=> loginToken = response.token)
            .then();
    }

    return {
        getLoginToken:()=> loginToken,
        clearLoginToken,
        login
    }
})();
