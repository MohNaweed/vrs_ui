import * as Actions from '../../actions/main/index';

const initialState = {
    allFuelRequest:  [],
    clearedFuelRequests:[],
    ownFuelRequests: []
}

const allFuelRequest = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_ALLFUELREQUEST:
        {
            return {
                ...state,
                allFuelRequest: payload.allFuelRequest
            };
        }
        case Actions.SET_CLEARED_FUEL_REQUESTS:
        {
            return {
                ...state,
                clearedFuelRequests: payload.clearedFuelRequests
            }
        }
        case Actions.SET_OWN_FUEL_REQUESTS:
        {
            return {
                ...state,
                ownFuelRequests : payload.ownFuelRequests
            }
        }
        
        
        default:
        {
            return state;
        }
    }
};

export default allFuelRequest;
