import * as types from './../types'
import axios from 'axios';

export const loginUser = (userInfo, history) => dispatch => {
    dispatch({type: types.LOADING_DATA})
    axios.post('/users/login', userInfo, {validateStatus: () => {return true}})
        .then(res => {
        if(res.data.status !== 'fail' && res.data.token) {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
        } else {
            dispatch({
                type: types.SET_LOGOUT_ERRORS,
                payload: res.data.message
            })
        }
    })
    .catch(err => console.log(err))
};

export const logoutUser = history => dispatch => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    history.push('/login')
    // history.go(0)

    dispatch({type: types.LOGOUT_USER})
};

export const getUserData = () => dispatch => {
    axios.get('users/me', {validateStatus: status => {return true}})
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