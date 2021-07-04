import * as Actions from '../../actions/main/index';

const initialState = {
    pendingRequestsToApprove:  [],
    pendingRequests:  [],
    clearedRequests:  [],
    ownRequests:  [],
}

const allRequest = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_PENDING_REQUESTS_TO_APPROVE:
        {
            return {
                ...state,
                pendingRequestsToApprove: payload.pendingRequestsToApprove
            };
        }
        case Actions.SET_PENDING_REQUESTS:
        {
            return {
                ...state,
                pendingRequests: payload.pendingRequests
            };
        }
        case Actions.SET_CLEARED_REQUESTS:
        {
            return {
                ...state,
                clearedRequests: payload.clearedRequests
            };
        }
        case Actions.SET_OWN_REQUESTS:
        {
            return {
                ...state,
                ownRequests: payload.ownRequests
            };
        }
          
        default:
        {
            return state;
        }
    }
};

export default allRequest;
