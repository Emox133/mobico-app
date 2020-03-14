import * as types from './../types'

const initialState = {
    user: {},
    likes: [],
    notifications: [],
    authenticated: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGOUT_USER: 
            return initialState

        default: 
            return state
    }
} 