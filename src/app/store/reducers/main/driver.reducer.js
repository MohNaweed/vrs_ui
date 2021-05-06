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
        case Actions.ADD_DRIVER:
        {
            return {
                ...state,
                drivers: [...state.drivers,payload.driver]
            };
        }
        case Actions.DEL_DRIVER:
        {
            return {
                ...state,
                drivers: state.drivers.filter(e => e.id !== payload.driver.id)
            };
        }
        case Actions.PUT_DRIVER:
        {
            const index = state.drivers.findIndex(x => x.id === payload.driver.id);
            const newDrivers = [...state.drivers];
            newDrivers.splice(index,1,payload.driver);

            return {
                ...state,
                drivers: newDrivers
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default driver;
