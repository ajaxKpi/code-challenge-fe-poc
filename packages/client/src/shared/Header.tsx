import * as React from 'react';
import { AuthApi } from '../auth/api/AuthApi';

interface HeaderProps{
    sme: string;
    user: string;
}

export function Header(props: HeaderProps){
    function logout() {
        AuthApi.clearLoginToken();
    }
    return <header>
        <div>{props.sme}</div>
        <div>{props.user}</div>
        <button onClick={logout}>Logout
        </button>
    </header>
}
