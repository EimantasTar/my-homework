import React from 'react';
import './App.css';
import { UserState } from '../store/types/userState';
import { CampState } from '../store/types/campState';
import { connect } from 'react-redux';
import { IInitialState } from '../store/initialState';
import { bindActionCreators, Dispatch } from 'redux';

export const mapStateToProps = (state: IInitialState): { users: UserState, camps: CampState } => ({
    users: state.users,
    camps: state.camps,
});

export const mapDispatchToProps = (dispatch: Dispatch): Record<string, unknown> => bindActionCreators({}, dispatch);

interface IStateProps {
    users: UserState;
    camps: CampState
}

interface IDispatchProps {
}

interface IOwnProps {
}

export type AppProps = IStateProps & IDispatchProps & IOwnProps;

export const App: React.FC<AppProps> = (props: AppProps) => {
    const { users, camps } = props;
    return (
        <div className="App">
            <header className="App-header">
                Learn React
            </header>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentType<IOwnProps>);
