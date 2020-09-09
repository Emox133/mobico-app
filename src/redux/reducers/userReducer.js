import * as types from './../types'

const initialState = {
    user: {},
    visitingUser: {},
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
                authenticated: true,
                loading: true
            }
        case types.SET_USER: 
            return {
                ...state,
                authenticated: true,
                loading: false,
                user: {...action.payload}
            }
        case types.VISITING_USER: 
            return {
                ...state,
                visitingUser: {...action.payload}
            }
        case types.CLEAR_VISITING_USER: 
            return {
                ...state,
                visitingUser: {}
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

        case types.LIKE_POST: 
            return {
                ...state,
                likes: [
                    ...state.likes,
                    action.payload
                ]
            }

        case types.DISLIKE_POST: 
            return {
                ...state,
                likes: state.likes.filter(l => l.belongsTo !== action.id)
            }

        case types.READ_NOTIFICATIONS:
                let notificationsCopy = [...state.notifications]
                notificationsCopy.forEach(n => n.read = true)
                return {
                    ...state,
                    notifications: notificationsCopy
                }

        default: 
            return state
    }
} 