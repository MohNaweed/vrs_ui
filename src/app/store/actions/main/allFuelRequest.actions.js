export const SET_ALLFUELREQUEST = 'SET_ALLFUELREQUEST';
export const SET_CLEARED_FUEL_REQUESTS = 'SET_CLEARED_FUEL_REQUESTS';
export const SET_OWN_FUEL_REQUESTS = 'SET_OWN_FUEL_REQUESTS';


export function setAllFuelRequest(requests){
    return {
        type: SET_ALLFUELREQUEST,
        payload:{
            allFuelRequest : requests
        }
    }
}

export function setClearedFuelRequests(requests){
    return {
        type : SET_CLEARED_FUEL_REQUESTS,
        payload:{
            clearedFuelRequests : requests
        }
    }
}

export function setOwnFuelRequests(requests){
    return {
        type: SET_OWN_FUEL_REQUESTS,
        payload :{
            ownFuelRequests: requests
        }
    }
}
