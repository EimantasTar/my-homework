import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Camp } from '../store/types/campState';
import { connect } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { User, UsersState } from '../store/types/userState';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { formatter } from '../utils/functions';
import moment from 'moment';

const mapStateToProps = (state: IInitialState) => ({
    users: state.users,
});

interface IStateProps {
    users: UsersState;
}

interface IOwnProps {
    item: Camp;
    selectedStartDate: Date | null;
    selectedEndDate: Date | null;
    searchText: string;
}

type CampaignInfoType = IOwnProps & IStateProps;

export const CampaignInfo: React.FC<CampaignInfoType> = (props: CampaignInfoType) => {
    const { item, selectedStartDate, selectedEndDate, searchText, users: { data } } = props;
    const [active, setActive] = useState<boolean>(false);
    const [visibleItem, setVisibleItem] = useState<boolean>(false);
    const [searchPass, setSearchPass] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const checkIfActive = (): void => {
        const currentUnix: number = moment((new Date().toLocaleDateString()), 'MM/DD/YYYY').valueOf();
        const startUnix: number = moment(item.startDate, 'MM/DD/YYYY').valueOf();
        const endUnix: number = moment(item.endDate, 'MM/DD/YYYY').valueOf();
        if ((currentUnix > startUnix && currentUnix < endUnix) || currentUnix === startUnix || currentUnix === endUnix) {
            setActive(true);
        } else setActive(false);
    };

    useEffect(() => {
        const startDate: string = moment(item.startDate, 'MM/DD/YYYY').format('DD/MM/YYYY');
        const endDate: string = moment(item.endDate, 'MM/DD/YYYY').format('DD/MM/YYYY');
        const budget: string = formatter.format(item.Budget);
        setStartDate(startDate);
        setEndDate(endDate);
        setBudget(budget);
        checkIfActive();
    }, [item]);

    const filterContentByDate = (selectedStartDate: Date, selectedEndDate: Date): void => {
        const selectedStartDateUnix: number = Date.parse(selectedStartDate.toLocaleDateString());
        const startUnix: number = Date.parse(item.startDate);
        const selectedEndDateUnix: number = Date.parse(selectedEndDate.toLocaleDateString());
        const endUnix: number = Date.parse(item.endDate);
        if (selectedStartDateUnix < startUnix && endUnix > selectedEndDateUnix && selectedEndDateUnix > startUnix) {
            setVisibleItem(true);
        } else if (selectedStartDateUnix === startUnix || startUnix === selectedEndDateUnix) {
            setVisibleItem(true);
        } else if (selectedStartDateUnix < endUnix && endUnix < selectedEndDateUnix) {
            setVisibleItem(true);
        } else if (selectedStartDateUnix === endUnix || endUnix === selectedEndDateUnix) {
            setVisibleItem(true);
        } else {
            setVisibleItem(false);
        }
    };

    useEffect(() => {
        if (selectedStartDate && selectedEndDate) {
            filterContentByDate(selectedStartDate, selectedEndDate);
        } else {
            setVisibleItem(true);
        }

    }, [selectedStartDate, selectedEndDate, item]);

    useEffect(() => {
        if (searchText) {
            setSearchPass(item.name.toLowerCase().includes(searchText.toLowerCase()));
        } else {
            setSearchPass(true);
        }
    }, [searchText]);

    const getUserNameById = (id: number): string => {
        let username: string;
        const user: User | undefined = data && data.find((user: User) => user.id === id);
        if (user) {
            username = user.name;
        } else {
            username = 'unknown user';
        }
        return username;
    };

    if (!visibleItem || !searchPass) {
        return null;
    }

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
