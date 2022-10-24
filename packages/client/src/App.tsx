import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Dashboard } from './dashboard/Dashboard'
import { Login } from './auth/Login'
import { Protected } from './shared/Protected';
import { AuthApi } from './auth/api/AuthApi'

function App() {
    function checkAuth(){
        return !!AuthApi.getLoginToken()
    }
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
                <Route
                    element={<Protected authDelegate={checkAuth} component={Dashboard}/>} path="dashboard"/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App
