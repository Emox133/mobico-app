import * as types from './../types'

const initialState = {
    errors: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case types.CLEAR_ERRORS: 
            return initialState

        default: 
            return state
    }
}