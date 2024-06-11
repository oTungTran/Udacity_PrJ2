import { combineReducers } from 'redux';
import usersSlice from '../slices/usersSlice';
import userSlice from '../slices/userSlice';
import questionsSlice from '../slices/questionsSlice';

const rootReducer = combineReducers({
    users: usersSlice,
    user: userSlice,
    questions: questionsSlice
});

export default rootReducer;
