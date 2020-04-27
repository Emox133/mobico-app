import * as types from './../types'

const initialState = {
    user: {},
    likes: [],
    notifications: [],
    authenticated: false,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGOUT_USER: 
            return initialState

        case types.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case types.SET_USER: 
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case types.LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case types.STOP_USER_LOADING:
            return {
                ...state,
                loading: false
            }
        default: 
            return state
    }
} 