export const SET_PENDING_REQUESTS_TO_APPROVE = 'SET_PENDING_REQUESTS_TO_APPROVE';  
export const SET_PENDING_REQUESTS = 'SET_PENDING_REQUESTS';  
export const SET_CLEARED_REQUESTS = 'SET_CLEARED_REQUESTS'; 
export const SET_OWN_REQUESTS = 'SET_OWN_REQUESTS'; 
export const SET_DRIVER_RELEVANT_REQUESTS = 'SET_DRIVER_RELEVANT_REQUESTS';



export function setPendingRequestsToApprove(requests){
    return {
        type: SET_PENDING_REQUESTS_TO_APPROVE,
        payload:{
            pendingRequestsToApprove : requests
        }
    }
}
export function setPendingRequests(requests){
    return {
        type: SET_PENDING_REQUESTS,
        payload:{
            pendingRequests : requests
        }
    }
}
export function setClearedRequests(requests){
    return {
        type: SET_CLEARED_REQUESTS,
        payload:{
            clearedRequests : requests
        }
    }
}
export function setOwnRequests(requests){
    return {
        type: SET_OWN_REQUESTS,
        payload:{
            ownRequests : requests
        }
    }
}

export function setDriverRelevantRequests(requests){
    return {
        type : SET_DRIVER_RELEVANT_REQUESTS,
        pyaload:{
            driverRelevantRequests : requests
        }
    }
}
