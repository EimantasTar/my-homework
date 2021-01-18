import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';
import { Camp, CampsState } from '../types/campState';

export const campsSlice = createSlice({
    name: 'camps',
    initialState: INITIAL_STATE.camps,
    reducers: {
        addCampsRequest: (state: CampsState): void => {
            state.isFetching = true;
            state.error = null;
        },
        addCampsSuccess: (state: CampsState, action: PayloadAction<Camp[]>): void => {
            if (state.data.length) {
                const updatedArray: Camp[] = [];
                const newArray: Camp[] = action.payload;
                state.data.map(oldItem => {
                    const duplicate: Camp | undefined = action.payload.find(newItem => newItem.id === oldItem.id);
                    if (duplicate) {
                        updatedArray.push(duplicate);
                        const index = newArray.indexOf(duplicate);
                        newArray.splice(index, 1);
                    } else {
                        updatedArray.push(oldItem);
                    }
                });

                state.data = updatedArray.concat(newArray);

            } else {
                state.data = action.payload;
            }
            state.isFetching = false;

        },
        addCampsFailure: (state: CampsState, action: PayloadAction<string>): void => {
            state.isFetching = false;
            state.error = action.payload;
        },
    }
});

export const {
    addCampsRequest: addCampsRequestAction,
    addCampsSuccess: addCampsSuccessAction,
    addCampsFailure: addCampsFailureAction,
} = campsSlice.actions;
