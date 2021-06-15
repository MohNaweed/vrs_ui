export const SET_ALLREQUEST = 'SET_ALLREQUEST';


export function setAllRequest(requests){
    return {
        type: SET_ALLREQUEST,
        payload:{
            allRequest : requests
        }
    }
}
