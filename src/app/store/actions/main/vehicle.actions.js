export const SET_VEHICLES = 'SET_VEHICLES';
export const ADD_VEHICLE = 'ADD_VEHICLE';
export const PUT_VEHICLE = 'PUT_VEHICLE';
export const DEL_VEHICLE = 'DEL_VEHICLE';

export function setvehicles(vehicles){
    return {
        type: SET_VEHICLES,
        payload:{
            vehicles
        }
    }
}
export function addvehicle(vehicle){
    return {
        type: ADD_VEHICLE,
        payload:{
            vehicle
        }
    }
}
export function putvehicle(vehicle){
    return {
        type: PUT_VEHICLE,
        payload:{
            vehicle
        }
    }
}
export function delvehicle(vehicle){
    return {
        type: DEL_VEHICLE,
        payload:{
            vehicle
        }
    }
}