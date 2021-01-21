import { UsersState } from './types/userState';
import { CampsState } from './types/campState';
import { FilterOptionsState } from './types/filterOptionsState';

export interface IInitialState {
    users: UsersState,
    camps: CampsState,
    filterOptions: FilterOptionsState,
}

const INITIAL_STATE: IInitialState = {
    users: {
        isFetching: false,
        data: [],
        error: null,
    },
    camps: {
        isFetching: false,
        data: [],
        error: null,
    },
    filterOptions: {
        selectedStartDate: null,
        selectedEndDate: null,
        text: '',
    }
};

export default INITIAL_STATE;
