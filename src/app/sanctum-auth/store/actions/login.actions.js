export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const MARK_AS_READ = 'MARK_AS_READ';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';


export function loginSuccess(user)
{
    return {
        type: LOGIN_SUCCESS,
        payload:{
            user
        }
    }
}

export function logoutSuccess()
{
    return {
        type: LOGOUT_SUCCESS
    }
}
export function pushNotification(unReadNotification)
{
    return {
        type: PUSH_NOTIFICATION,
        payload:{
            unReadNotification
        }
    }
}
export function markAsRead()
{
    return {
        type: MARK_AS_READ,
    }
}

export function setNotifications(notifications,unreadNotificationsCount)
{
    return {
        type: SET_NOTIFICATIONS,
        payload:{
            notifications,
            unreadNotificationsCount
        }
    }
}
