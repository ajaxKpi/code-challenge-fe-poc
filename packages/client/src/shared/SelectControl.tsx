import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
export interface SelectProps{
    currentValue: string;
    handleSelectedChange: any;
    items: any[];
}

export function SelectControl(props:SelectProps){
    function selectOption(selectItem: any){
        return props.handleSelectedChange(selectItem.target.value)
    }
    return <FormControl fullWidth>
        <InputLabel id="select-label">Status</InputLabel>
        <Select
            labelId="select-label"
            value={props.currentValue}
            onChange={selectOption}
        >
            {props.items.map(item=>
            <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
        )}

        </Select>
    </FormControl>
}
