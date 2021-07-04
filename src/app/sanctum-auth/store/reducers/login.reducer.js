import * as Actions from '../actions';

const initialState = {
    success: false,
    user:{},
    Role : ''
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
    case Actions.MARK_AS_READ:{
      return{
        ...state,
        user: {...state.user,unreadNotificationsCount:0}
      }
    }
    case Actions.SET_NOTIFICATIONS:{
      return{
        ...state,
        user: 
        {...state.user,
          unreadNotificationsCount : action.payload.unreadNotificationsCount,
          notifications: action.payload.notifications
        }
      }
    }
    case Actions.PUSH_NOTIFICATION:{
      let shouldChange = true;
      for(let unreadNot of state.user.unread_notifications ){
        if(unreadNot.id === action.payload.unReadNotification.id){
          shouldChange =  false;
        
        }
      }
    
      if(shouldChange){
        return{
          ...state,
          user:{...state.user,
            notificationCount : state.user.notificationCount + 1,
            unread_notifications : [{data: action.payload.unReadNotification},...state.user.unread_notifications]
            }
        }
      }
      else return state;
    }
    default:{
        return state;
    }
  }
};

export default login;