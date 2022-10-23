import * as React from "react";
import { useEffect, useState } from "react";
import { Header } from '../shared/Header'
import { Transactions } from './components/Transactions';
import { SideBar } from './components/SideBar';
import { getCurrentUser, getSME, getSmeTransactions } from './api/SMEApi';
import { SMEUsersResponse } from './models/DTOs';
import { TransactionFeedItem } from './models/Models';

export function Dashboard() {
    const [loader, handleLoaderState] = useState(false);
    const [smeID, handleSmeId] = useState('');
    const [smeName, handleSmeName] = useState('');
    const [currentUser, handleCurrentUser] = useState(new SMEUsersResponse());
    const [smeTransactions, handleSmeTransactions] = useState([new TransactionFeedItem()]);
    const [currentTransaction, handlerCurrentTransaction] = useState(new TransactionFeedItem());

    useEffect(()=>{
        handleLoaderState(true)
        // todo: called multiple times
            Promise.all([
                getSME(),
                getCurrentUser()
            ])
            .then(([{id, legalName}, currentUser])=>{
                handleSmeId(id)
                handleSmeName(legalName)
                handleSmeName(legalName)
                handleCurrentUser(currentUser)
            })
                .finally(()=> {
                    handleLoaderState(false)
                })
    }, [smeID])

    useEffect(()=>{
        if(currentUser.id){
            getSmeTransactions(currentUser.id, smeID)
                .then(transactions =>  handleSmeTransactions(transactions))
        }
    }, [currentUser.id])
    return (
        <div>
            <Header sme={smeName} user={currentUser?.name}></Header>
            <select>
                <option value="COMPLETED">COMPLETED</option>
            </select>
            {loader
                ? <div>loader</div>
                : <div>
                    <Transactions
                        transactions={smeTransactions}
                        selectTransaction ={handlerCurrentTransaction}>
                    </Transactions>
                    <SideBar selectedTransaction = {currentTransaction}>
                    </SideBar>
                </div>
            }
        </div>
    );
}
