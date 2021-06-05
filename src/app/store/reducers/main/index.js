import {combineReducers} from 'redux';
import driver from './driver.reducer';
import vehicle from './vehicle.reducer';
import department from './department.reducer';
import location from './location.reducer';
import request from './request.reducer';

const fuseReducers = combineReducers({
    driver,
    vehicle,
    department,
    location,
    request
});

export default fuseReducers;
