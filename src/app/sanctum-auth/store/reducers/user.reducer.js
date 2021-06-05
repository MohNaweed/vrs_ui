import * as Actions from '../actions';

const initialState = {
    users:  []
}

const user = function (state = initialState, {type, payload}) {
    switch ( type )
    {
        case Actions.SET_USERS:
        {
            return {
                ...state,
                users: payload.users
            };
        }
        case Actions.ADD_USER:
        {
            return {
                ...state,
                users: [...state.users,payload.user]
            };
        }
        case Actions.DEL_USER:
        {
            return {
                ...state,
                users: state.users.filter(e => e.id !== payload.user.id)
            };
        }
        case Actions.PUT_USER:
        {
            const index = state.users.findIndex(x => x.id === payload.user.id);
            const newusers = [...state.users];
            newusers.splice(index,1,payload.user);

            return {
                ...state,
                users: newusers
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default user;
