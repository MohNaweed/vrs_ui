export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const PUT_LOCATION = 'PUT_LOCATION';
export const DEL_LOCATION = 'DEL_LOCATION';

export function setLocations(locations){
    return {
        type: SET_LOCATIONS,
        payload:{
            locations
        }
    }
}
export function addLocation(location){
    return {
        type: ADD_LOCATION,
        payload:{
            location
        }
    }
}
export function putLocation(location){
    return {
        type: PUT_LOCATION,
        payload:{
            location
        }
    }
}
export function delLocation(location){
    return {
        type: DEL_LOCATION,
        payload:{
            location
        }
    }
}