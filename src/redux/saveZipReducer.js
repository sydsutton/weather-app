import * as ActionTypes from "./ActionTypes"

export const saveZipReducer = (state = {savedZipCodes: []}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_ZIP:
        return {...state, savedZipCodes: state.savedZipCodes.concat(action.payload)}
    
    default: 
        return state
    }
}