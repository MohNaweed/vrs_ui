import {combineReducers} from 'redux';
import driver from './driver.reducer';
import vehicle from './vehicle.reducer';
import department from './department.reducer';
import location from './location.reducer';
import request from './request.reducer';
import allRequest from './allRequest.reducer';
import allFuelRequest from './allFuelRequest.reducer';

const fuseReducers = combineReducers({
    driver,
    vehicle,
    department,
    location,
    request,
    allRequest,
    allFuelRequest,
});

export default fuseReducers;
