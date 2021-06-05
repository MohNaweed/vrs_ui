export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const PUT_USER = 'PUT_USER';
export const DEL_USER = 'DEL_USER';

export function setUsers(users){
    return {
        type: SET_USERS,
        payload:{
            users
        }
    }
}
export function addUser(user){
    return {
        type: ADD_USER,
        payload:{
            user
        }
    }
}
export function putUser(user){
    return {
        type: PUT_USER,
        payload:{
            user
        }
    }
}
export function delUser(user){
    return {
        type: DEL_USER,
        payload:{
            user
        }
    }
}