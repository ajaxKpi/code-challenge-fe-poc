import * as React from "react";
import { Avatar, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TransactionFeedItem, TransactionSideInfo } from '../models/Models';
import { dateFormatter } from '../../shared/utils';

export interface TransactionProps{
    transactions: TransactionFeedItem[];
    selectTransaction: (item: TransactionFeedItem)=> void;
}
export function Transactions(props: TransactionProps) {
    function onTableRowClick(event:unknown, row: TransactionFeedItem){
        props.selectTransaction(row)

    }    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Icon</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Currency</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.transactions.map((row) => (
                    <TableRow
                        hover
                        role="checkbox"
                        key={row.date}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={ (event) => onTableRowClick(event, row)}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">
                            <Avatar src={row.icon}/>
                        </TableCell>
                        <TableCell align="right">{dateFormatter(row.date)}</TableCell>
                        <TableCell align="right">{row.currency}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}
