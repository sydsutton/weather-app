import * as ActionTypes from "./ActionTypes"

export const saveZip = zipCode => ({
    type: ActionTypes.SAVE_ZIP,
    payload: zipCode
})

export const searchZip = zipCode => ({
    type: ActionTypes.SEARCH_ZIP,
    payload: zipCode
})