import * as React from 'react-router-dom';
import { TransactionFeedItem, TransactionSideInfo } from '../models/Models';
import { Avatar, Card, CardHeader, Chip, Drawer } from '@mui/material';
import { red } from '@mui/material/colors';

export interface SideBarProps {
    selectedTransaction: TransactionSideInfo
    clearTransactionHandler: any
}

export function SideBar(props: SideBarProps) {
    const cardStyle = {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'row-gap': '50px'
    }
    console.log(props);
    return props.selectedTransaction ? <Drawer
            anchor='right'
            open={!!props.selectedTransaction?.userName}
            onClose={() => props.clearTransactionHandler(null)}
        >
            <div style= {cardStyle} >
                <Chip label={props.selectedTransaction.status} color="success" variant="outlined"/>
                <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={props.selectedTransaction.image}
                >
                </Avatar>
                <Card>
                    <CardHeader
                        title={props.selectedTransaction.userName}
                        subheader={props.selectedTransaction.date}
                    />

                </Card>
            </div>

        </Drawer>
        : null
}
