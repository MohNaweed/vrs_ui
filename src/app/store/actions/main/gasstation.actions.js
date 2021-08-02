export const SET_GASSTATIONS = 'SET_GASSTATION';
export const ADD_GASSTATION = 'ADD_GASSTATION';
export const PUT_GASSTATION = 'PUT_GASSTATION';
export const DEL_GASSTATION = 'DEL_GASSTATION';

export function setGasstations(gasstations){
    return {
        type: SET_GASSTATIONS,
        payload:{
            gasstations
        }
    }
}
export function addGasstation(gasstation){
    return {
        type: ADD_GASSTATION,
        payload:{
            gasstation
        }
    }
}
export function putGasstation(gasstation){
    return {
        type: PUT_GASSTATION,
        payload:{
            gasstation
        }
    }
}
export function delGasstation(gasstation){
    return {
        type: DEL_GASSTATION,
        payload:{
            gasstation
        }
    }
}