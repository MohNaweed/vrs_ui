export const SET_DEPS = 'SET_DEPS';
export const ADD_DEP = 'ADD_DEP';
export const PUT_DEP = 'PUT_DEP';
export const DEL_DEP = 'DEL_DEP';

export function setDepartments(departments){
    return {
        type: SET_DEPS,
        payload:{
            departments
        }
    }
}
export function addDepartment(department){
    return {
        type: ADD_DEP,
        payload:{
            department
        }
    }
}
export function putDepartment(department){
    return {
        type: PUT_DEP,
        payload:{
            department
        }
    }
}
export function delDepartment(department){
    return {
        type: DEL_DEP,
        payload:{
            department
        }
    }
}