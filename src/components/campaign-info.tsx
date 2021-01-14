import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Camp } from '../store/types/campState';
import { connect } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { User, UsersState } from '../store/types/userState';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { addZero, formatter } from '../utils/functions';

const mapStateToProps = (state: IInitialState) => ({
    users: state.users,
});

interface IStateProps {
    users: UsersState;
}

interface IOwnProps {
    item: Camp
}

type CampaignInfoType = IOwnProps & IStateProps;

export const CampaignInfo: React.FC<CampaignInfoType> = (props: CampaignInfoType) => {
    const { item, users: { data } } = props;
    const [active, setActive] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const getHumanDateFormat = (date: string) => {
        const unix: number = Date.parse(date);
        const newDate: string = new Date(unix).toLocaleDateString();
        const day: string = addZero(parseInt(newDate.split('/')[0]));
        const month: string = addZero(parseInt(newDate.split('/')[1]));
        const year: string = newDate.split('/')[2];
        return day + '/' + month + '/' + year;
    };

    useEffect(() => {
        const startDate: string = getHumanDateFormat(item.startDate);
        const endDate: string = getHumanDateFormat(item.endDate);
        const budget: string = formatter.format(item.Budget);
        setStartDate(startDate);
        setEndDate(endDate);
        setBudget(budget);
    }, [item]);

    const getUserNameById = (id: number): string => {
        let username = '';
        const user: User | undefined = data && data.find((user: User) => user.id === id);
        if (user) {
            username = user.name;
        } else {
            username = 'unknown user';
        }
        return username;
    };

    return (
        <TableRow className="tableBodyRow">
            <TableCell className="tableBodyCell">{item.name}</TableCell>
            <TableCell className="tableBodyCell">{getUserNameById(item.userId)}</TableCell>
            <TableCell className="tableBodyCell">{startDate}</TableCell>
            <TableCell className="tableBodyCell">{endDate}</TableCell>
            <TableCell className="tableBodyCell">
                <div className="multiCell">
                    <FiberManualRecordIcon className={active ? ' icon green' : 'icon red'} />
                    <p className="customText">{active ? 'active' : 'inactive'}</p>
                </div>
            </TableCell>
            <TableCell className="tableBodyCell">{budget}</TableCell>
        </TableRow>
    );
};

export default connect(mapStateToProps, null)(CampaignInfo as React.ComponentType<IOwnProps>);
