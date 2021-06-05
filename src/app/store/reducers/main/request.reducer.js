import * as Actions from '../../actions/main/index';

const initialState = {
    requests:  []
}

const request = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_REQUESTS:
        {
            return {
                ...state,
                requests: payload.requests
            };
        }
        case Actions.ADD_REQUEST:
        {
            return {
                ...state,
                requests: [...state.requests,payload.request]
            };
        }
        case Actions.DEL_REQUEST:
        {
            return {
                ...state,
                requests: state.requests.filter(e => e.id !== payload.request.id)
            };
        }
        case Actions.PUT_REQUEST:
        {
            const index = state.requests.findIndex(x => x.id === payload.request.id);
            const newrequests = [...state.requests];
            newrequests.splice(index,1,payload.request);

            return {
                ...state,
                requests: newrequests
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default request;
