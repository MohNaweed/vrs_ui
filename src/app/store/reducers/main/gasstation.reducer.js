import * as Actions from '../../actions/main/index';

const initialState = {
    gasstations :  []
}

const gasstation = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_GASSTATIONS:
        {
            return {
                ...state,
                gasstations: payload.gasstations
            };
        }
        case Actions.ADD_GASSTATION:
        {
            return {
                ...state,
                gasstations: [payload.gasstation, ...state.gasstations]
            };
        }
        case Actions.DEL_GASSTATION:
        {
            return {
                ...state,
                gasstations: state.gasstations.filter(e => e.id !== payload.gasstation.id)
            };
        }
        case Actions.PUT_GASSTATION:
        {
            const index = state.gasstations.findIndex(x => x.id === payload.gasstation.id);
            const newGasstation = [...state.gasstations];
            newGasstation.splice(index,1,payload.gasstation);

            return {
                ...state,
                gasstations: newGasstation
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default gasstation;
