import * as types from './../types'
import axios from 'axios';

export const loginUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.post('/users/login', userInfo, {validateStatus: () => {return true}})
        .then(res => {
            console.log(res.data)
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

const setAuthorizationHeader = token => {
    const JWT = `Bearer ${token}`;
    localStorage.setItem('token', JWT);
    axios.defaults.headers.common['Authorization'] = JWT;
};