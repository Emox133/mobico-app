import * as types from './../types'

const initialState = {
    errors: {},
    scrollEffect: true
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
        
        case types.START_SCROLL_EFFECT:
            return {
                ...state,
                scrollEffect: false
            }

        default: 
            return state
    }
}