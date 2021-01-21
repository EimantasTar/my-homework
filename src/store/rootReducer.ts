import { combineReducers } from 'redux';
import { usersSlice } from './slices/users-slice';
import { campsSlice } from './slices/camps-slice';
import { filterOptionsSlice } from './slices/filterOptions-slice';

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    camps: campsSlice.reducer,
    filterOptions: filterOptionsSlice.reducer,
});

export default rootReducer;
