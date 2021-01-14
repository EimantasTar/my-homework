import React from 'react';
import '../index.css';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import App from '../app/App';
import { store } from '../store/store';

export const HotApp = hot(App);

export const ColdApp = (): React.ReactElement => {
    return (
        <Provider store={store}>
            <HotApp />
        </Provider>
    );
};
