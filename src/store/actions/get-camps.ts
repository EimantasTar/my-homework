import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Action, Dispatch } from 'redux';
import { campsSlice } from '../slices/camps-slice';
import { Camp } from '../types/campState';

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

const validate = (array: Camp[]) => {
    const requiredKey: string[] = ['id', 'name', 'startDate', 'endDate', 'Budget', 'userId'];
    const requiredValueType: string[] = ['number', 'string', 'string', 'string', 'number', 'number'];
    const errors: string[] = [];
    let inputIsValid = false;

    array.map((camp: Camp, index: number) => {
        const number: number = index + 1;
        const length: number = Object.keys(camp).length;
        let message = '';
        if (length && length < 6) {
            message = 'Please make sure all required fields are filled in objects';
        } else if (length && length > 6) {
            message = 'Please make sure only required fields are filled in objects';
        }
        if (message) {
            throw new Error(message);
        }

        requiredKey.forEach((w: string, index: number) => {
            // @ts-ignore
            const value = camp[w];
            if (!value) {
                if (array.length === 1) {
                    errors.push('Please fill the required field "' + w + '"');
                } else if (w === 'id') {
                    errors.push('Please fill the required field "' + w + '" in object number: ' + number);
                } else {
                    errors.push('Please fill the required field "' + w + '" in object that "id" = ' + camp.id);
                }
            } else if (typeof value !== requiredValueType[index]) {
                errors.push('Please check the type of values inserted');
            }
        });
    });
    if (errors.length) {
        let message = '';
        errors.map(item => {
            message = message + item + '.\n';
        });
        throw new Error(message);
    } else {
        inputIsValid = true;
    }

    return inputIsValid;
}

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
