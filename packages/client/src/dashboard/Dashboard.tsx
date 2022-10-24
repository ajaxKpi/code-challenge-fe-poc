import * as React from "react";
import { useEffect, useState } from "react";
import { Header } from '../shared/Header'
import { Transactions } from './components/Transactions';
import { SideBar } from './components/SideBar';
import { getCurrentUser, getSME, getSmeTransactions } from './api/SMEApi';
import { SMEUsersResponse } from './models/DTOs';
import { Status, TransactionFeedItem, TransactionSideInfo } from './models/Models';
import { SelectControl } from '../shared/SelectControl';
import { Alert, Box, CircularProgress } from '@mui/material';
import { UserDataStorage } from '../UsersDataStorage';

export function Dashboard() {
    const [loader, handleLoaderState] = useState(false);
    const [smeID, handleSmeId] = useState('');
    const [smeName, handleSmeName] = useState('');
    const [currentUser, handleCurrentUser] = useState(new SMEUsersResponse());
    const [smeTransactions, handleSmeTransactions] = useState<TransactionFeedItem[]>([]);
    const [currentTransaction, handlerCurrentTransaction] = useState<TransactionSideInfo>();
    const [currentSelectedStatus, handlerSelectedStatus] = useState(Status.COMPLETED);
    const [hasTransactionError, handlerHasTransactionError] = useState(false);

    function selectTransaction(selectedTransaction: TransactionFeedItem){
        const {status, userID, date} = selectedTransaction;
        const {image, userName} = UserDataStorage.getUserDataById(userID);
            handlerCurrentTransaction(
                {
                    image,
                    status,
                    userName,
                    date
                }
            );
    }

    function getAvailableStatusList() {
        return Object.entries(Status)
            .filter(([_, value]) => value !== Status.REVERSED)
    }

    useEffect(() => {
        handleLoaderState(true)
        Promise.all([
            getSME(),
            getCurrentUser()
        ])
            .then(([{ id, legalName }, currentUser]) => {
                handleSmeId(id)
                handleSmeName(legalName)
                handleCurrentUser(currentUser)
            })
            .finally(() => {
                handleLoaderState(false);
            })
    }, [smeID])

    useEffect(() => {
        if (currentUser.id) {
            handleLoaderState(true)
            handlerHasTransactionError(false)
            getSmeTransactions(smeID, currentSelectedStatus)
                .then(transactions => handleSmeTransactions(transactions))
                .catch(err=>handlerHasTransactionError(true))
                .finally(() => {
                    handleLoaderState(false)
                })
        }
    }, [currentSelectedStatus, currentUser.id])
    return (
        <div>
            <Header sme={smeName} user={currentUser?.name} profileImage={currentUser.profileImage}/>
            <SelectControl items={getAvailableStatusList()} currentValue={currentSelectedStatus}
                           handleSelectedChange={handlerSelectedStatus}/>
            {loader
                ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress/>
                </Box>
                : hasTransactionError
                    ? <Alert severity="error">Wrong email or password</Alert>
                    : <div>
                        <Transactions
                            transactions={smeTransactions}
                            selectTransaction={selectTransaction}/>

                        <SideBar
                            selectedTransaction={currentTransaction}
                            clearTransactionHandler={handlerCurrentTransaction}
                        />
                    </div>
            }
        </div>
    );
}
