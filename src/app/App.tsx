import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { UsersState } from '../store/types/userState';
import { Camp, CampsState } from '../store/types/campState';
import { connect } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { bindActionCreators, Dispatch } from 'redux';
import { getUsersData } from '../store/actions/get-users';
import { getCampsData } from '../store/actions/get-camps';
import {
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
} from '@material-ui/core';
import { TABLE_HEAD_CONTENT } from '../utils/constants';
import { GridLoader } from 'react-spinners/index';
import CampaignInfo from '../components/campaign-info';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { checkDateRange } from '../utils/functions';


export const mapStateToProps = (state: IInitialState): { users: UsersState, camps: CampsState } => ({
    users: state.users,
    camps: state.camps,
});

export const mapDispatchToProps = (dispatch: Dispatch): Record<string, unknown> => bindActionCreators({
    getUsersData: () => getUsersData(),
    getCampsData: () => getCampsData(),
}, dispatch);

interface IStateProps {
    users: UsersState;
    camps: CampsState;
}

interface IDispatchProps {
    getUsersData: () => void;
    getCampsData: () => void;
}

interface IOwnProps {
}

export type AppProps = IStateProps & IDispatchProps & IOwnProps;

export const App: React.FC<AppProps> = (props: AppProps): React.ReactElement => {
    const { camps: { data, error }, getUsersData, getCampsData } = props;
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [errorArray, setErrorArray] = useState<string[]>([]);


    useEffect(() => {
        getUsersData();
        getCampsData();
    }, []);

    useEffect(() => {
        if (error && typeof error === 'string') {
            const arr: string[] = error.split('.');
            setErrorArray(arr);
        } else {
            setErrorArray([]);
        }
    }, [error]);

    const onChangeStartDate = (date: Date | null): void => {
        if (date && selectedEndDate) {
            const valid = checkDateRange(date, selectedEndDate);
            if (valid) {
                setSelectedStartDate(date);
            }
        } else {
            setSelectedStartDate(date);
        }
    };

    const onChangeEndDate = (date: Date | null): void => {
        if (selectedStartDate && date) {
            const valid = checkDateRange(selectedStartDate, date);
            if (valid) {
                setSelectedEndDate(date);
            }
        } else {
            setSelectedEndDate(date);
        }
    };

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setSearchText(e.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                My Homework
            </header>
            <Container className="containerWrapper" maxWidth="lg">
                <Container className="containerWrapper border">
                    {
                        errorArray.length ?
                            <div className="containerWrapper">
                                {errorArray.map((e: string, index: number) => {
                                    if (e !== '\n') {
                                        return <p key={index} className="errors">* {e}</p>
                                    }
                                })}
                            </div>
                            : null
                    }
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="toolBarContainer">
                            <Grid container className="containerWrapper">
                                <Grid item lg={3} md={3} sm={6} className="flex-start">
                                    <DatePicker
                                        margin="normal"
                                        label="Start Date"
                                        format="dd/MM/yyyy"
                                        value={selectedStartDate}
                                        onChange={onChangeStartDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} className="flex-start">
                                    <DatePicker
                                        margin="normal"
                                        label="End Date"
                                        format="dd/MM/yyyy"
                                        value={selectedEndDate}
                                        onChange={onChangeEndDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} className="flex-start" />
                                <Grid item lg={3} md={3} sm={12} className="flex-start">
                                    <form noValidate autoComplete="off" className="searchForm">
                                        <TextField
                                            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChangeText(e)}
                                            className="textField"
                                            id="standard-basic"
                                            label="Search by name"
                                        />
                                    </form>
                                </Grid>
                            </Grid>
                        </div>
                    </MuiPickersUtilsProvider>
                    <Container className="containerWrapper">
                        <TableContainer className="tableContainerWrapper" component={Paper}>
                            {data.length ?
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {TABLE_HEAD_CONTENT.map((item: string, index: number) =>
                                                <TableCell key={index} className="tableHeadCell">{item}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item: Camp, index: number) =>
                                            <CampaignInfo
                                                key={index}
                                                item={item}
                                                selectedStartDate={selectedStartDate}
                                                selectedEndDate={selectedEndDate}
                                                searchText={searchText}
                                            />
                                        )}
                                    </TableBody>
                                </Table>
                                :
                                <div className="spinner">
                                    <GridLoader loading={true} />
                                </div>
                            }
                        </TableContainer>
                    </Container>
                </Container>
            </Container>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentType<IOwnProps>);
