export const SET_REQUESTS = 'SET_REQUESTS';
export const ADD_REQUEST = 'ADD_REQUEST';
export const PUT_REQUEST = 'PUT_REQUEST';
export const DEL_REQUEST = 'DEL_REQUEST';

export function setRequests(requests){
    return {
        type: SET_REQUESTS,
        payload:{
            requests
        }
    }
}
export function addRequest(request){
    return {
        type: ADD_REQUEST,
        payload:{
            request
        }
    }
}
export function putRequest(request){
    return {
        type: PUT_REQUEST,
        payload:{
            request
        }
    }
}
export function delRequest(request){
    return {
        type: DEL_REQUEST,
        payload:{
            request
        }
    }
}