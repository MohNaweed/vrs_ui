import * as Actions from '../../actions/main/index';

const initialState = {
    vehicles:  []
}

const vehicle = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_VEHICLES:
        {
            return {
                ...state,
                vehicles: payload.vehicles
            };
        }
        case Actions.ADD_VEHICLE:
        {
            return {
                ...state,
                vehicles: [...state.vehicles,payload.vehicle]
            };
        }
        case Actions.DEL_VEHICLE:
        {
            return {
                ...state,
                vehicles: state.vehicles.filter(e => e.id !== payload.vehicle.id)
            };
        }
        case Actions.PUT_VEHICLE:
        {
            const index = state.vehicles.findIndex(x => x.id === payload.vehicle.id);
            const newvehicles = [...state.vehicles];
            newvehicles.splice(index,1,payload.vehicle);

            return {
                ...state,
                vehicles: newvehicles
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default vehicle;
