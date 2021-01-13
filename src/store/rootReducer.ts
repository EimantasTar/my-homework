import { combineReducers } from 'redux';
import { usersSlice } from './slices/users-slice';

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    // camps: campsSlice.reducer,
});

export default rootReducer;
