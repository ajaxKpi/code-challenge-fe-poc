import * as React from "react";
import { useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom'
import { AuthApi } from './api/AuthApi';

export function Login(){
    const [userName, handleUserName] = useState('');
    const [userPass, handleUserPass] = useState('');
    const [isLoginIn, handleLoginStatus] = useState(false);
    // useEffect(()=>{
    //     handleLoginStatus()
    // })

    async function loginUser(){
        await AuthApi.login(userName, userPass).then(()=>handleLoginStatus(true));
    }
    function handleUserNameChange(event: any){ // todo
        event.persist();
        handleUserName(event.target.value);
    }
    function handleUserPassChange(event: any){ // todo
        event.persist();
        handleUserPass(event.target.value);
    }

    return isLoginIn
            ? <Navigate to='/dashboard'/>
            : <div>
        <label> Name
            <input type="text"  value={userName} onChange={handleUserNameChange}/>
        </label>
        <label> Password
            <input type="password" value={userPass} onChange={handleUserPassChange}/>
        </label>
        <button onClick={loginUser}>Login</button>
    </div>
}
