import React, { useEffect } from 'react';
import './App.css';
import { User, UsersState } from '../store/types/userState';
import { CampsState } from '../store/types/campState';
import { connect } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { bindActionCreators, Dispatch } from 'redux';
import { getUsersData } from '../store/actions/get-users';

export const mapStateToProps = (state: IInitialState): { users: UsersState, camps: CampsState } => ({
    users: state.users,
    camps: state.camps,
});

export const mapDispatchToProps = (dispatch: Dispatch): Record<string, unknown> => bindActionCreators({
    getUsersData: () => getUsersData(),
}, dispatch);

interface IStateProps {
    users: UsersState;
    camps: CampsState;
}

interface IDispatchProps {
    getUsersData: () => void;
}

interface IOwnProps {
}

export type AppProps = IStateProps & IDispatchProps & IOwnProps;

export const App: React.FC<AppProps> = (props: AppProps) => {
    const { users: { data }, getUsersData } = props;


    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                My Homework
            </header>
            <div>
                {data && data.map((user: User) => <a>{user.name}</a>)}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentType<IOwnProps>);
