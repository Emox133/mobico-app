import * as types from './../types'
import axios from 'axios';

export const loginUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post('/users/login', userInfo)
    .then(res => {
        if(res.status === 200 && res.data.token) {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            history.go(0)
        } 
    })
    .catch(err => {
        dispatch({
            type: types.SET_ERRORS,
            payload: Object.assign({message: err.response.data.message}, {}) || err.response.data.error
        })
    })
};

export const logoutUser = history => dispatch => {
    history.push('/login')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: types.LOGOUT_USER})
    history.go(0)
};

export const signupUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post('users/signup', userInfo)
    .then(res => {
        if(res.status === 201 && res.data.token) {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData())
            history.push('/')
            history.go(0)
        } 
    })
    .catch(err => {
        dispatch({
            type: types.SET_ERRORS,
            payload: err.response.data.error.errors
        })
    })
};

export const getAllUsers = () => dispatch => {
    axios.get('/users').then(res => {
        dispatch({
            type: types.GET_ALL_USERS,
            payload: res.data.users
        })
    }).catch(err => console.log(err.response))
}

export const getUserData = () => dispatch => {
    dispatch({type: types.SET_AUTHENTICATED})
    axios.get('users/me')
    .then(res => {
        dispatch({
            type: types.SET_USER,
            payload: {
                user: res.data.data.user,
                friendRequestsSentByMe: res.data.data.friendRequests,
                notifications: res.data.data.notifications,
                likes: res.data.data.likes
            }
        })
    })
    .catch(err => console.log(err.response))
};

export const visitProfiles = (history, id) => dispatch => {
    axios.get(`users/${id}`).then(res => {
        dispatch({
            type: types.VISITING_USER,
            payload: res.data.user
        })
        history.push('/me')
    }).catch(err => console.log(err.response))
}

export const clearVisitingUser = () => dispatch => {
    dispatch({type: types.CLEAR_VISITING_USER})
}

export const updateProfile = data => dispatch => {
    axios.patch('users/updateMe', data)
    .then(res => {
        if(res.status === 200) {
            dispatch(getUserData());
            alert('Data changed successfully. 😜')
        }
    })
    .catch(err => {
        dispatch({type: types.STOP_USER_LOADING})
        dispatch({
            type: types.SET_ERRORS,
            payload: err.response.data.error.errors
        })
    })
};

export const forgotPassword = (email, history) => dispatch => {
    axios.post('/users/forgotPassword', email)
    .then(res => {
        if(res.status === 200) {
            alert('Email sent!')
            history.go(0)
        } 
    })
    .catch(err => {
        dispatch({
            type: types.SET_ERRORS,
            payload: {emailMessage: err.response.data.message}
        })
    })
};

export const resetPassword = (token, data,  history) => dispatch => {
    axios.post(`/users/resetPassword/${token}`, data)
    .then(res => {
        if(res.status === 200 && res.data.token) {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            alert('Password successfully changed! 🎉')
        } 
    })
    .catch(err => {
        dispatch({type: types.STOP_USER_LOADING})
        dispatch({
            type: types.SET_ERRORS,
            payload: {resetMessage: err.response.data.message}
        })
    })
};

export const changePassword = (data, history) => dispatch => {
    dispatch({type: types.LOADING_DATA});
    axios.patch('/users/updateMyPassword', data)
    .then(res => {
        if(res.status === 200) {
            dispatch({type: types.STOP_USER_LOADING})
            alert(`${res.data.message} 🎈 Please log in again 😃`);
            dispatch(logoutUser(history))
        }
    }).catch(err => {
        dispatch({type: types.STOP_USER_LOADING})
        dispatch({
            type: types.SET_ERRORS,
            payload: {newPasswordMessage: err.response.data.message}
        })
    })
};

export const deleteProfile = history => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.delete('/users/deleteMe')
    .then(res => {
        if(res.status === 204) {
            dispatch({type: types.STOP_USER_LOADING})
            dispatch(logoutUser(history))
        }
    })
    .catch(err => {
        dispatch({
            type: types.SET_ERRORS,
            payload: err.response.data.error
        })
    })
};

export const notificationsSeen = () => dispatch => {
    axios.patch('/users/notifications')
    .then(res => {
        if(res.status === 200) {
            dispatch({type: types.READ_NOTIFICATIONS})
        }
    })
    .catch(err => {
        console.log(err.response)
    })
};

export const getMyFriendRequests = () => dispatch => {
    axios.get('/users/friend-requests').then(res => {
        if(res.status === 200) {
            dispatch({
                type: types.GET_MY_FRIEND_REQUESTS,
                payload: res.data.friendRequests
            })
            dispatch({
                type: types.WHO_SENT_FRIEND_REQUEST,
                payload: res.data.senders
            })
        }
    }).catch(err => {
        console.log(err.response)
    })
}

export const sendFriendRequest = (id) => dispatch =>{
    axios.post(`/users/${id}`).then(res => {
        if(res.status === 201) {
            dispatch({
                type: types.SEND_FRIEND_REQUEST,
                payload: res.data.friendRequest
            })
        }
    }).catch(err => {
        console.log(err.response)
    })
}

export const acceptFriendRequest = id => dispatch => {
    axios.patch(`users/${id}`).then(res => {
        if(res.status === 200) {
            dispatch({
                type: types.ACCEPT_FRIEND_REQUEST,
                id
            })
        }
    }).catch(err => console.log(err.response))
}

export const undoFriendRequest = (id) => dispatch =>{
    axios.delete(`/users/${id}`).then(res => {
        if(res.status === 204) {
            dispatch({
                type: types.UNDO_FRIEND_REQUEST,
                id
            })
        }
    }).catch(err => console.log(err.response))
}

export const friends = () => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.get('/users/friends').then(res => {
        if(res.status === 200) {
            dispatch({
                type: types.SET_POSTS,
                payload: res.data.friendsPosts
            })
        }
    }).catch(err => console.log(err.response))
}

export const friendRequestsIreceivedAndAccepted = () => dispatch => {
    axios.get('/users/my-friends').then(res => {
        if(res.status === 200) {
            dispatch({
                type: types.FRIEND_REQUESTS_I_RECEIVED_AND_ACCEPTED,
                payload: res.data.acceptedRequests
            })
        }
    }).catch(err => console.log(err.response))
} 

export const scrollEffect = ref => dispatch => {
    ref.current.scrollIntoView({behavior: "smooth"})
}

const setAuthorizationHeader = token => {
    const JWT = `Bearer ${token}`;
    localStorage.setItem('token', JWT);
    axios.defaults.headers.common['Authorization'] = JWT;
};
