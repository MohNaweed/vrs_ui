import * as Actions from '../../actions/main/index';

const initialState = {
    departments :  []
}

const department = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_DEPS:
        {
            return {
                ...state,
                departments: payload.departments
            };
        }
        case Actions.ADD_DEP:
        {
            return {
                ...state,
                departments: [...state.departments,payload.department]
            };
        }
        case Actions.DEL_DEP:
        {
            return {
                ...state,
                departments: state.departments.filter(e => e.id !== payload.department.id)
            };
        }
        case Actions.PUT_DEP:
        {
            const index = state.departments.findIndex(x => x.id === payload.department.id);
            const newDeps = [...state.departments];
            newDeps.splice(index,1,payload.department);

            return {
                ...state,
                departments: newDeps
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default department;
