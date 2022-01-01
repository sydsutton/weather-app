import * as ActionTypes from "./ActionTypes"

export const zipReducer = (state = {savedZipCodes: []}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_ZIP:
            return {...state, savedZipCodes: state.savedZipCodes.concat(action.payload)}
        case ActionTypes.DELETE_ZIP:
            return {...state, savedZipCodes: state.savedZipCodes.filter(zip => zip !== action.payload)}
    default: 
        return state
    }
}