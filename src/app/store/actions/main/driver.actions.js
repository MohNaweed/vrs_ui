export const SET_DRIVERS = 'SET_DRIVERS';
export const ADD_DRIVER = 'ADD_DRIVER';
export const PUT_DRIVER = 'PUT_DRIVER';
export const DEL_DRIVER = 'DEL_DRIVER';

export function setDrivers(drivers){
    return {
        type: SET_DRIVERS,
        payload:{
            drivers: drivers
        }
    }
}
export function addDriver(driver){
    return {
        type: ADD_DRIVER,
        payload:{
            driver: driver
        }
    }
}
export function putDriver(driver){
    return {
        type: PUT_DRIVER,
        payload:{
            driver: driver
        }
    }
}
export function delDriver(driver){
    return {
        type: DEL_DRIVER,
        payload:{
            driver: driver
        }
    }
}