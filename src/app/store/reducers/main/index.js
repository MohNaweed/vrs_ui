import {combineReducers} from 'redux';
import driver from './driver.reducer';
import vehicle from './vehicle.reducer';
import department from './department.reducer';

const fuseReducers = combineReducers({
    driver,
    vehicle,
    department
});

export default fuseReducers;
