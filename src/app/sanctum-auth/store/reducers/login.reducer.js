import * as Actions from '../actions';

const initialState = {
    success: false,
    user:{}
};

const login = function (state = initialState, action) {
  switch(action.type){
    case Actions.LOGIN_SUCCESS:{
      return{
        ...state,
        success: true,
        user: action.payload.user
      }
    }
    case Actions.LOGOUT_SUCCESS:{
      return{
        ...state,
        success: false,
        user: {}
      }
    }
    default:{
        return state;
    }
  }
};

export default login;