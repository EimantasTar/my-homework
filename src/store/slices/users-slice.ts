import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';
import { User, UsersState } from '../types/userState';

export const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE.users,
    reducers: {
        addUsersRequest: (state: UsersState): void => {
            state.isFetching = true;
            state.error = null;
        },
        addUsersSuccess: (state: UsersState, action: PayloadAction<User[]>): void => {
            state.isFetching = false;
            state.data = action.payload;
        },
        addUsersFailure: (state: UsersState, action: PayloadAction<string>): void => {
            state.isFetching = false;
            state.error = action.payload;
        },
    }
});

export const {
    addUsersRequest: addUsersRequestAction,
    addUsersSuccess: addUsersSuccessAction,
    addUsersFailure: addUsersFailureAction,
} = usersSlice.actions;
