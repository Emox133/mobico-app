import * as types from './../types'
import axios from 'axios';

export const loginUser = (userInfo, history) => dispatch => {
    axios.post('/users/login', userInfo, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error' && res.data.token) {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            // history.go(0)
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
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    history.push('/login')
    history.go(0)

    dispatch({type: types.LOGOUT_USER})
};

export const signupUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_DATA});
    axios.post('users/signup', userInfo, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res.data)
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

export const getUserData = () => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.get('users/me', {validateStatus: () => {return true}})
    .then(res => {
        dispatch({
            type: types.SET_USER,
            payload: res.data.data
        })
    })
    .catch(err => console.log(err))
};

export const updateProfile = data => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.patch('users/updateMe', data, {validateStatus: () => {return true}})
    .then(res => {
        dispatch({type: types.STOP_USER_LOADING})
        if(res.data.error) {
            // dispatch({
            //     type: types.SET_ERRORS,
            //     payload: res.data.error.errors
            // })
            console.log(res.data.error)
        } else {
            // dispatch(getUserData());
            window.location.reload();
            // alert('Data changed successfully. 😜')
            // dispatch({type: types.START_SCROLL_EFFECT, payload: 'on'})
        }
    })
    .catch(err => {
        console.error(err)
    })
};

export const forgotPassword = (email, history) => dispatch => {
    axios.post('/users/forgotPassword', email, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res)
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
        console.log(err)
    })
};

export const resetPassword = (token, data,  history) => dispatch => {
    axios.post(`/users/resetPassword/${token}`, data, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error' && res.data.token) {
            console.log(res)
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
            alert('Password successfully changed! 🎉')
        } else {
            console.log(res)
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
            console.log(res)
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
    axios.delete('/users/deleteMe', {validateStatus: () => {return true}})
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
    .catch(err => console.error(err))
};

const setAuthorizationHeader = token => {
    const JWT = `Bearer ${token}`;
    localStorage.setItem('token', JWT);
    axios.defaults.headers.common['Authorization'] = JWT;
};
