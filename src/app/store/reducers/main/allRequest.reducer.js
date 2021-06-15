import * as Actions from '../../actions/main/index';

const initialState = {
    allRequest:  []
}

const allRequest = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_ALLREQUEST:
        {
            return {
                ...state,
                allRequest: payload.allRequest
            };
        }
        
        
        default:
        {
            return state;
        }
    }
};

export default allRequest;
