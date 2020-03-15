import * as types from './../types'

const initialState = {
    errors: {
        message: ''
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SET_LOGOUT_ERRORS:
            let errors = {...state.errors}
            errors.message = action.payload
            return {
                ...state,
                errors: errors
            }
        case types.CLEAR_ERRORS: 
            return initialState

        default: 
            return state
    }
}