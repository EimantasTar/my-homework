import React, { useEffect } from 'react';
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

    useEffect(() => {
        getUsersData();
        getCampsData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                My Homework
            </header>
            <Container>
                <Container className="containerWrapper">
                    <Grid container>
                        <Grid item xs className="containerWrapper"> Start Date</Grid>
                        <Grid item xs className="containerWrapper">End Date</Grid>
                        <Grid item xs />
                        <Grid item xs className="containerWrapper">Search by name</Grid>
                    </Grid>
                    <Container className="containerWrapper">
                        <TableContainer component={Paper}>
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

export default connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentType<IOwnProps>);
