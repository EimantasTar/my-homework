import { Action, Dispatch } from 'redux';
import { USERS_URL } from '../../utils/constants';
import { User } from '../types/userState';
import { usersSlice } from '../slices/users-slice';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

const {
    addUsersRequest,
    addUsersSuccess,
    addUsersFailure,
}: {
    addUsersRequest: ActionCreatorWithoutPayload,
    addUsersSuccess: ActionCreatorWithPayload<User[]>,
    addUsersFailure: ActionCreatorWithPayload<string>,
} = usersSlice.actions;

export const getUsersData = () => async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(addUsersRequest());
    try {
        const res: Response = await fetch(USERS_URL);
        const result: User[] = await res.json();
        dispatch(addUsersSuccess(result));
    } catch (error) {
        const { message }: { message: string } = error;
        dispatch(addUsersFailure(message));
    }
};
