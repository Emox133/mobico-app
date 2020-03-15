import * as types from './../types'

const initialState = {
    posts: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }

        case types.LOADING_FROM_DATA:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}