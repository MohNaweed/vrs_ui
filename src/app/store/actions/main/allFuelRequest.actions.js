export const SET_ALLFUELREQUEST = 'SET_ALLFUELREQUEST';


export function setAllFuelRequest(requests){
    return {
        type: SET_ALLFUELREQUEST,
        payload:{
            allFuelRequest : requests
        }
    }
}
