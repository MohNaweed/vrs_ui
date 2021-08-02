import * as Actions from '../../actions/fuse/index';
import navigationConfig from 'app/fuse-configs/navigationConfig';
import {adminNavigation, securityNavigation, transportNavigation, driverNavigation } from './navigationLimit';

const initialState = navigationConfig;

const navigation = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_NAVIGATION:
        {
            return [
                ...state
            ];
        }
        case Actions.SET_NAVIGATION:
        {
            return navigationByCat(action.cat);
        }
        case Actions.RESET_NAVIGATION:
        {
            return [
                ...initialState
            ];
        }
        default:
        {
            return state;
        }
    }
};

export default navigation;


const navigationByCat = (cat) =>{
    switch (cat){
        case 0:{
            return adminNavigation();
        }
        case 1:{
            return securityNavigation();
        }
        case 2:{
            return transportNavigation();
        }
        case 3:{
            return driverNavigation();
        }
        default:{
            return navigationConfig
        }
    }
}



