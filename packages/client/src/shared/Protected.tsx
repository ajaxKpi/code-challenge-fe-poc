import React from 'react';
import { Navigate } from 'react-router-dom';

export function Protected({ component: Component, authDelegate, ...rest }: any){
    return authDelegate()
        ? <Component {...rest} />
        : <Navigate to='/login'/>
}
