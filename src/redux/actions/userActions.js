import * as types from './../types'
import axios from 'axios';

export const loginUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post('/users/login', userInfo, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error' && res.data.token) {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            history.go(0)
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: Object.assign({message: res.data.message}, {}) || res.data.error
            })
        }
    })
    .catch(err => console.log(err))
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
    axios.post('users/signup', userInfo, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res.data)
        if(res.data.status !== 'fail' && res.data.status !== 'error' && res.data.token) {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData())
            history.push('/')
            history.go(0)
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: res.data.error.errors
            })
        }
    })
    .catch(err => console.log(err))
};

export const getAllUsers = () => dispatch => {
    axios.get('/users').then(res => {
        dispatch({
            type: types.GET_ALL_USERS,
            payload: res.data.users
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const getUserData = () => dispatch => {
    dispatch({type: types.SET_AUTHENTICATED})
    axios.get('users/me', {validateStatus: () => {return true}})
    .then(res => {
        dispatch({
            type: types.SET_USER,
            payload: {
                user: res.data.data.user,
                // myFriends: res.data.data.myFriends,
                friendRequestsSentByMe: res.data.data.friendRequests,
                notifications: res.data.data.notifications,
                likes: res.data.data.likes
            }
        })
    })
    .catch(err => console.log(err))
};

export const visitProfiles = (history, id) => dispatch => {
    axios.get(`users/${id}`).then(res => {
        dispatch({
            type: types.VISITING_USER,
            payload: res.data.user
        })
        history.push('/me')
    }).catch(err => {
        console.log(err.response)
    })
}

export const clearVisitingUser = () => dispatch => {
    dispatch({type: types.CLEAR_VISITING_USER})
}

export const updateProfile = data => dispatch => {
    axios.patch('users/updateMe', data)
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            // console.log(res)
            dispatch(getUserData());
            alert('Data changed successfully. 😜')
        } else {
            // console.log(res)
            dispatch({type: types.STOP_USER_LOADING})
            dispatch({
                type: types.SET_ERRORS,
                payload: res.data.error.errors
            })
        }
    })
    .catch(err => {
        console.error(err.response)
    })
};

export const forgotPassword = (email, history) => dispatch => {
    axios.post('/users/forgotPassword', email, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res)
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            alert('Email sent!')
            history.go(0)
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: {emailMessage: res.data.message}
            })
        }
    })
    .catch(err => {
        console.log(err.response)
    })
};

export const resetPassword = (token, data,  history) => dispatch => {
    axios.post(`/users/resetPassword/${token}`, data, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error' && res.data.token) {
            // console.log(res)
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            alert('Password successfully changed! 🎉')
        } else {
            // console.log(res)
            dispatch({type: types.STOP_USER_LOADING})
            dispatch({
                type: types.SET_ERRORS,
                payload: {resetMessage: res.data.message}
            })
        }
    })
    .catch(err => console.log(err))
};

export const changePassword = (data, history) => dispatch => {
    dispatch({type: types.LOADING_DATA});
    axios.patch('/users/updateMyPassword', data, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            dispatch({type: types.STOP_USER_LOADING})
            alert(`${res.data.message} 🎈 Please log in again 😃`);
            dispatch(logoutUser(history))
        } else {
            // console.log(res)
            dispatch({type: types.STOP_USER_LOADING})
            dispatch({
                type: types.SET_ERRORS,
                payload: {newPasswordMessage: res.data.message}
            })
        }
    }).catch(err => {
        console.log(err)
    })
};

export const deleteProfile = history => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.delete('/users/deleteMe')
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            dispatch({type: types.STOP_USER_LOADING})
            dispatch(logoutUser(history))
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: res.data.error
            })
        }
    })
    .catch(err => console.error(err.response))
};

export const notificationsSeen = () => dispatch => {
    axios.patch('/users/notifications')
    .then(res => {
        console.log(res)
        dispatch({type: types.READ_NOTIFICATIONS})
    })
    .catch(err => {
        console.log(err.response)
    })
};

export const getMyFriendRequests = () => dispatch => {
    axios.get('/users/friend-requests').then(res => {
        dispatch({
            type: types.GET_MY_FRIEND_REQUESTS,
            payload: res.data.friendRequests
        })
        dispatch({
            type: types.WHO_SENT_FRIEND_REQUEST,
            payload: res.data.senders
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const sendFriendRequest = (id) => dispatch =>{
    axios.post(`/users/${id}`).then(res => {
        dispatch({
            type: types.SEND_FRIEND_REQUEST,
            payload: res.data.friendRequest
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const acceptFriendRequest = id => dispatch => {
    axios.patch(`users/${id}`).then(res => {
        console.log(res)
        dispatch({
            type: types.ACCEPT_FRIEND_REQUEST,
            id
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const undoFriendRequest = (id) => dispatch =>{
    axios.delete(`/users/${id}`).then(res => {
        dispatch({
            type: types.UNDO_FRIEND_REQUEST,
            id
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const friends = () => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.get('/users/friends').then(res => {
        // console.log(res)
        dispatch({
            type: types.SET_POSTS,
            payload: res.data.friendsPosts
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const friendRequestsIreceivedAndAccepted = () => dispatch => {
    axios.get('/users/my-friends').then(res => {
        dispatch({
            type: types.FRIEND_REQUESTS_I_RECEIVED_AND_ACCEPTED,
            payload: res.data.acceptedRequests
        })
    }).catch(err => {
        console.log(err.response)
    })
} 

// export const fetchPosts = () => dispatch => {
//     dispatch({type: types.LOADING_FROM_DATA});
//     axios.get('/posts', {validateStatus: () => {return true}})
//     .then(res => {
//         dispatch({
//             type: types.SET_POSTS,
//             payload: res.data.data.posts
//         })
//     })
//     .catch(err => console.log(err))
// };

export const scrollEffect = ref => dispatch => {
    ref.current.scrollIntoView({behavior: "smooth"})
}

const setAuthorizationHeader = token => {
    const JWT = `Bearer ${token}`;
    localStorage.setItem('token', JWT);
    axios.defaults.headers.common['Authorization'] = JWT;
};
