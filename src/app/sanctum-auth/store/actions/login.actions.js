export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
