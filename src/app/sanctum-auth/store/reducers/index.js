import {combineReducers} from 'redux';
//import user from './user.reducer';
import login from './login.reducer';
//import register from './register.reducer';

const sanctumAuth = combineReducers({
    login,
});

export default sanctumAuth;