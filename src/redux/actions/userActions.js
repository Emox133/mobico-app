import * as types from './../types'
import axios from 'axios';

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    window.location = '/login'

    dispatch({type: types.LOGOUT_USER})
};