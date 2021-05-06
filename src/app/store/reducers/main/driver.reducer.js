import * as Actions from '../../actions/main/index';

const initialState = {
    drivers:  []
}

const driver = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_DRIVERS:
        {
            return {
                ...state,
                drivers: payload.drivers
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default driver;
