import { sendPostRequest } from '../../api/ApiService';
import { LoginRequest, LoginResponse } from '../models/DTOs';
import { useNavigate } from "react-router-dom";


export const AuthApi = (() => {
    let loginToken = '';
    let currentUserEmail = '';
    function clearLoginToken(){
        // const navigate = useNavigate()
            loginToken = '';
            // navigate('/login');
    }
    async function login(email: string, password: string): Promise<void>{
        currentUserEmail = email;
        return sendPostRequest<LoginRequest, LoginResponse>('/login', {email, password})
            .then(response=> loginToken = response.token)
            .then();
    }

    return {
        getLoginToken:()=> loginToken,
        getCurrentUserEmail: ()=> currentUserEmail,
        clearLoginToken,
        login
    }
})();
