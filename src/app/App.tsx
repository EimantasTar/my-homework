import React, { ChangeEvent, useEffect } from 'react';
import './App.css';
import { Camp } from '../store/types/campState';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { Action, bindActionCreators, Dispatch } from 'redux';
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
import { filterOptionsSlice } from '../store/slices/filterOptions-slice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import moment from 'moment';


export const mapDispatchToProps = (dispatch: Dispatch): {
    getUsersData: () => (dispatch: Dispatch<Action>) => Promise<void>;
    getCampsData: () => (dispatch: Dispatch<Action>) => void;
} => bindActionCreators({
    getUsersData: () => getUsersData(),
    getCampsData: () => getCampsData(),
}, dispatch);

interface IDispatchProps {
    getUsersData: () => void;
    getCampsData: () => void;
}

interface IOwnProps {
}

export type AppProps = IDispatchProps & IOwnProps;

export const App: React.FC<AppProps> = (props: AppProps): React.ReactElement => {
    const { getUsersData, getCampsData } = props;
    const { data, error }: { data: Camp[], error: null | string | Error } = useSelector((state: IInitialState) => state.camps);
    const { selectedStartDate }: { selectedStartDate: string | null } = useSelector((state: IInitialState) => state.filterOptions);
    const { selectedEndDate }: { selectedEndDate: string | null } = useSelector((state: IInitialState) => state.filterOptions);
    const dispatch = useDispatch();
    const { changeStartDate, changeEndDate, changeText }: {
        changeStartDate: ActionCreatorWithPayload<string | null>,
        changeEndDate: ActionCreatorWithPayload<string | null>,
        changeText: ActionCreatorWithPayload<string>,
    } = filterOptionsSlice.actions;

    useEffect(() => {
        getUsersData();
        getCampsData();
    }, []);

    const handleChangeStartDate = (date: Date | null) => {
        if (date && selectedEndDate) {
            const dateUnix: number = moment(date).startOf('day').valueOf();
            const selectedEndDateUnix: number = moment(moment(selectedEndDate, 'DD/MM/YYYY').toDate()).valueOf();
            if (dateUnix <= selectedEndDateUnix) {
                dispatch(changeStartDate(moment(date).format('DD/MM/YYYY')));
            }
        } else if (date) {
            dispatch(changeStartDate(moment(date).format('DD/MM/YYYY')));
        } else {
            dispatch(changeStartDate(null));
        }
    };

    const handleChangeEndDate = (date: Date | null) => {
        if (selectedStartDate && date) {
            const dateUnix: number = moment(date).startOf('day').valueOf();
            const selectedStartDateUnix: number = moment(moment(selectedStartDate, 'DD/MM/YYYY').toDate()).valueOf();
            if (dateUnix >= selectedStartDateUnix) {
                dispatch(changeEndDate(moment(date).format('DD/MM/YYYY')));
            }
        } else if (date) {
            dispatch(changeEndDate(moment(date).format('DD/MM/YYYY')));
        } else {
            dispatch(changeEndDate(null));
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                My Homework
            </header>
            <Container className="containerWrapper" maxWidth="lg">
                <Container className="containerWrapper border">
                    {error && typeof error === 'string' &&
                    <div className="containerWrapper">
                        {error.split('.').map((e: string, index: number): JSX.Element | null => {
                            if (e !== '') {
                                return <p key={index} className="errors">* {e}</p>
                            } else return null
                        })}
                    </div>
                    }
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="toolBarContainer">
                            <Grid container className="containerWrapper">
                                <Grid item lg={3} md={3} sm={6} className="flex-start">
                                    <DatePicker
                                        margin="normal"
                                        label="Start Date"
                                        format="dd/MM/yyyy"
                                        value={selectedStartDate ? moment(selectedStartDate, 'DD/MM/YYYY').toDate() : null}
                                        onChange={handleChangeStartDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} className="flex-start">
                                    <DatePicker
                                        margin="normal"
                                        label="End Date"
                                        format="dd/MM/yyyy"
                                        value={selectedEndDate ? moment(selectedEndDate, 'DD/MM/YYYY').toDate() : null}
                                        onChange={handleChangeEndDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} className="flex-start" />
                                <Grid item lg={3} md={3} sm={12} className="flex-start">
                                    <form noValidate autoComplete="off" className="searchForm">
                                        <TextField
                                            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                                dispatch(changeText(e.target.value))}
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
                                            {TABLE_HEAD_CONTENT.map((item: string, index: number): JSX.Element =>
                                                <TableCell key={index} className="tableHeadCell">{item}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item: Camp, index: number): JSX.Element =>
                                            <CampaignInfo key={index} item={item} />
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

export default connect(null, mapDispatchToProps)(App as React.ComponentType<IOwnProps>);
