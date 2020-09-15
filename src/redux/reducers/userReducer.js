import * as types from './../types'

const initialState = {
    user: {},
    friendRequestsIreceivedAndAccepted: [],
    allUsers: [],
    friendRequests: [],
    friendRequestsSentByMe: [],
    whoSentFriendRequests: [],
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
                user: {...action.payload.user},
                // myFriends: [...action.payload.myFriends],
                friendRequestsSentByMe: [...action.payload.friendRequestsSentByMe],
                likes: [...action.payload.likes],
                notifications: [...action.payload.notifications] 
            }
        case types.FRIEND_REQUESTS_I_RECEIVED_AND_ACCEPTED:
            return {
                ...state,
                friendRequestsIreceivedAndAccepted: [...action.payload]
            }
        case types.GET_ALL_USERS:
            return {
                ...state,
                allUsers: [...action.payload]
            }
        case types.GET_MY_FRIEND_REQUESTS:
            return {
                ...state,
                friendRequests: [...action.payload]
            }
        case types.SEND_FRIEND_REQUEST:
            return {
                ...state,
                friendRequestsSentByMe: [
                    ...state.friendRequestsSentByMe,
                    action.payload
                ]
            }
        case types.ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(r => r.requestSender !== action.id)
            }
        case types.UNDO_FRIEND_REQUEST:
            return {
                ...state,
                friendRequestsSentByMe: state.friendRequestsSentByMe.filter(r => r.requestReceiver !== action.id)
            }
        case types.WHO_SENT_FRIEND_REQUEST:
            return {
                ...state,
                whoSentFriendRequests: [...action.payload]
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