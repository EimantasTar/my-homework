import React, { useEffect, useState } from 'react';
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
    TableRow,
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
    const { camps: { data }, getUsersData, getCampsData } = props;
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    useEffect(() => {
        getUsersData();
        getCampsData();
    }, []);

    const onChangeStartDate = (date: Date | null) => {
        if (date && selectedEndDate) {
            const valid = checkDateRange(date, selectedEndDate);
            if (valid) {
                setSelectedStartDate(date);
            }
        } else {
            setSelectedStartDate(date);
        }
    };

    const onChangeEndDate = (date: Date | null) => {
        if (selectedStartDate && date) {
            const valid = checkDateRange(selectedStartDate, date);
            if (valid) {
                setSelectedEndDate(date);
            }
        } else {
            setSelectedEndDate(date);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                My Homework
            </header>
            <Container className="containerWrapper" maxWidth="lg">
                <Container className="containerWrapper border">
                    <Grid container className="containerWrapper">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs className="flex-start">
                                <div className="datePicker">
                                    <DatePicker
                                        margin="normal"
                                        label="Start Date"
                                        format="dd/MM/yyyy"
                                        value={selectedStartDate}
                                        onChange={onChangeStartDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs className="flex-start">
                                <div className="datePicker">
                                    <DatePicker
                                        margin="normal"
                                        label="End Date"
                                        format="dd/MM/yyyy"
                                        value={selectedEndDate}
                                        onChange={onChangeEndDate}
                                        clearable
                                        clearLabel="clear"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs />
                            <Grid item xs className="flex-end">Search by name</Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
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
