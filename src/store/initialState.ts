import { UserState } from './types/userState';
import { CampState } from './types/campState';

export interface IInitialState {
    users: UserState,
    camps: CampState,
}

const initialState: IInitialState = {
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

export default initialState;
