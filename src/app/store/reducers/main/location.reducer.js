import * as Actions from '../../actions/main/index';

const initialState = {
    locations:  []
}

const location = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_LOCATIONS:
        {
            return {
                ...state,
                locations: payload.locations
            };
        }
        case Actions.ADD_LOCATION:
        {
            return {
                ...state,
                locations: [...state.locations,payload.location]
            };
        }
        case Actions.DEL_LOCATION:
        {
            return {
                ...state,
                locations: state.locations.filter(e => e.id !== payload.location.id)
            };
        }
        case Actions.PUT_LOCATION:
        {
            const index = state.locations.findIndex(x => x.id === payload.location.id);
            const newlocations = [...state.locations];
            newlocations.splice(index,1,payload.location);

            return {
                ...state,
                locations: newlocations
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default location;
