import {combineReducers} from 'redux';
import fuse from './fuse';
import main from './main';
import auth from 'app/auth/store/reducers';
import sanctumAuth from 'app/sanctum-auth/store/reducers'
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        main,
        auth,
        sanctumAuth,
        fuse,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
