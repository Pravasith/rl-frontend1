export function userData(state = {
}, action){

    switch(action.type){
        case "UPDATE_USER_DATA":
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}


