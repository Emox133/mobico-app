import * as types from './../types'

const initialState = {
    posts: [],
    singlePost: {
        post: [],
        comments: []
    },
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

        case types.SET_ONE_POST:
            return {
                ...state,
                loading: false,
                singlePost: action.payload
            }
        
        case types.CREATE_POST:
            return {
                ...state,
                loading: false
            }
        
        case types.DELETE_POST:
            return {
                ...state,
                loading: false
            }

        case types.LIKE_POST: 
            return {
                ...state,
                loading: false
            }

        case types.DISLIKE_POST:
            return {
                ...state,
                loading: false
            }
        
        case types.LOADING_FROM_DATA:
            return {
                ...state,
                loading: true
            }

        case types.STOP_LOADING: 
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}