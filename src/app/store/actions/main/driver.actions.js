export const SET_DRIVERS = 'SET_DRIVERS';

export function set_drivers(drivers){
    return {
        type: SET_DRIVERS,
        payload:{
            drivers: drivers
        }
    }
}