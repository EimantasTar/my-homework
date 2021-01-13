import { UsersState } from './types/userState';
import { CampsState } from './types/campState';

export interface IInitialState {
    users: UsersState,
    camps: CampsState,
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
};

export default INITIAL_STATE;
