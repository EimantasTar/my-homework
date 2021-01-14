import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Action, Dispatch } from 'redux';
import { campsSlice } from '../slices/camps-slice';
import { Camp } from '../types/campState';
import { validate } from '../../utils/functions';

const {
    addCampsRequest,
    addCampsSuccess,
    addCampsFailure,
}: {
    addCampsRequest: ActionCreatorWithoutPayload,
    addCampsSuccess: ActionCreatorWithPayload<Camp[]>,
    addCampsFailure: ActionCreatorWithPayload<string>,
} = campsSlice.actions;

declare const window: { AddCampaigns: (array: Camp[]) => void; };

export const getCampsData = () => async (dispatch: Dispatch<Action>): Promise<void> => {
    window.AddCampaigns = (array: Camp[]) => {
        dispatch(addCampsRequest());
        try {
            if (array && array.length) {
                const res: boolean = validate(array);
                if (res) {
                    dispatch(addCampsSuccess(array));
                }
            } else throw new Error('Please fill some data');
        } catch (error) {
            const { message }: { message: string } = error;
            console.log(message);
            dispatch(addCampsFailure(message));
        }
    }
};
