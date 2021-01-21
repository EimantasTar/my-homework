import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';
import { FilterOptionsState } from '../types/filterOptionsState';

export const filterOptionsSlice = createSlice({
    name: 'filterOptions',
    initialState: INITIAL_STATE.filterOptions,
    reducers: {
        changeStartDate: (state: FilterOptionsState, { payload }: { payload: null | string }): void => {
            state.selectedStartDate = payload;
        },
        changeEndDate: (state: FilterOptionsState, { payload }: { payload: null | string }): void => {
            state.selectedEndDate = payload;
        },
        changeText: (state: FilterOptionsState, { payload }: { payload: string }): void => {
            state.text = payload;
        },
    }
});

export const {
    changeStartDate: changeStartDateAction,
    changeEndDate: changeEndDateAction,
    changeText: changeTextAction,
} = filterOptionsSlice.actions;
