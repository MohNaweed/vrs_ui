import * as Actions from '../../actions/main/index';

const initialState = {
    allFuelRequest:  []
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
        
        
        default:
        {
            return state;
        }
    }
};

export default allFuelRequest;
